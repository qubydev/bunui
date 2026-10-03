"use client";

import * as React from "react";
import {
  useState,
  useRef,
  useLayoutEffect,
  useEffect,
  useCallback,
  useMemo,
  forwardRef,
  type ReactNode,
  type ComponentPropsWithoutRef,
} from "react";
import Link from "next/link";
import { motion, useMotionValue, useTransform, animate } from "motion/react";
import { cn } from "@/lib/utils";

function DefaultArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      className={cn("w-[1.15em] h-[1.15em] shrink-0", className)}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

/**
 * Marks which piece of text transforms into the arrow on hover.
 * Usage:
 * ```tsx
 * <GlideButton>Start <Arrow>a</Arrow> project</GlideButton>
 * ```
 */
export function Arrow({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
Arrow.displayName = "Arrow";
(Arrow as any).__isArrow = true;

export const GlideButtonArrow = Arrow;

export type GlideButtonProps = Omit<
  ComponentPropsWithoutRef<"button">,
  "children"
> & {
  /** The content of the button. Wrap the transforming piece with <Arrow>...</Arrow>. */
  children: ReactNode;
  /** Optional fallback prop to specify the transforming text substring (e.g. arrow="a"). */
  arrow?: string;
  /** Optional destination URL. If provided, renders an accessible Next.js Link. */
  href?: string;
  /** Custom arrow icon element (defaults to proportional sleek right arrow). */
  arrowIcon?: ReactNode;
  /** Visual variant matching shadcn button variants. */
  variant?: "default" | "outline" | "secondary" | "ghost";
  /** Size variant matching shadcn button sizes. Defaults to "lg". */
  size?: "default" | "sm" | "lg";
  /** Controlled hover state (optional). */
  isHovered?: boolean;
};

const SIZE_STYLES = {
  sm: "px-4 py-2 text-xs",
  default: "px-5 py-3 text-sm font-medium",
  lg: "px-6 py-3.5 text-sm font-medium",
};

const VARIANT_STYLES = {
  default:
    "bg-primary text-primary-foreground hover:bg-primary/90 shadow-xs",
  outline:
    "border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground",
  secondary:
    "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  ghost:
    "hover:bg-accent hover:text-accent-foreground",
};

function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export const GlideButton = forwardRef<
  HTMLButtonElement & HTMLAnchorElement,
  GlideButtonProps
>(function GlideButton(
  {
    children,
    arrow,
    href,
    arrowIcon,
    variant = "default",
    size = "lg",
    className,
    isHovered: controlledHovered,
    onMouseEnter,
    onMouseLeave,
    disabled,
    onClick,
    ...props
  },
  forwardedRef
) {
  const [internalHovered, setInternalHovered] = useState(false);
  const isHovered = controlledHovered !== undefined ? controlledHovered : internalHovered;

  const containerRef = useRef<HTMLSpanElement | null>(null);
  const targetRef = useRef<HTMLSpanElement | null>(null);
  const suffixRef = useRef<HTMLSpanElement | null>(null);
  const arrowRef = useRef<HTMLSpanElement | null>(null);

  // Exact translation distances and center compensation measured 100% dynamically from DOM
  const [shifts, setShifts] = useState({
    targetShift: 0,
    suffixShift: 0,
    centerOffset: 0,
  });

  // Parse text into prefix, arrowPiece, and suffix
  const parsed = useMemo(() => {
    // 1. Inspect React children for <Arrow> or <GlideButton.Arrow>
    const prefixNodes: ReactNode[] = [];
    const suffixNodes: ReactNode[] = [];
    let arrowNode: ReactNode = null;
    let foundArrow = false;

    React.Children.forEach(children, (child) => {
      const isArrowComponent =
        React.isValidElement(child) &&
        (child.type === Arrow ||
          child.type === GlideButtonArrow ||
          (child.type as any)?.displayName === "Arrow" ||
          (child.type as any)?.displayName === "GlideButtonArrow" ||
          (child.type as any)?.__isArrow === true);

      if (isArrowComponent) {
        foundArrow = true;
        arrowNode = (child.props as any)?.children;
      } else if (!foundArrow) {
        prefixNodes.push(child);
      } else {
        suffixNodes.push(child);
      }
    });

    if (foundArrow) {
      return {
        prefix: prefixNodes.length > 0 ? prefixNodes : null,
        arrowPiece: arrowNode,
        suffix: suffixNodes.length > 0 ? suffixNodes : null,
      };
    }

    // 2. Bracket shortcut in string: e.g. "Start [a] project"
    if (typeof children === "string") {
      const bracketMatch = children.match(/\[([^\]]+)\]/);
      if (bracketMatch && bracketMatch.index !== undefined) {
        const p = children.slice(0, bracketMatch.index).trim();
        const a = bracketMatch[1].trim();
        const s = children.slice(bracketMatch.index + bracketMatch[0].length).trim();
        return {
          prefix: p ? [p] : null,
          arrowPiece: a,
          suffix: s ? [s] : null,
        };
      }

      // 3. Fallback: arrow prop (e.g. arrow="a")
      if (arrow) {
        const trimmedArrow = arrow.trim();
        const wordRegex = new RegExp(`\\b${escapeRegExp(trimmedArrow)}\\b`, "i");
        const match = children.match(wordRegex);

        if (match && match.index !== undefined) {
          const p = children.slice(0, match.index).trim();
          const s = children.slice(match.index + match[0].length).trim();
          return {
            prefix: p ? [p] : null,
            arrowPiece: match[0],
            suffix: s ? [s] : null,
          };
        }

        const idx = children.indexOf(trimmedArrow);
        if (idx !== -1) {
          const p = children.slice(0, idx).trim();
          const s = children.slice(idx + trimmedArrow.length).trim();
          return {
            prefix: p ? [p] : null,
            arrowPiece: trimmedArrow,
            suffix: s ? [s] : null,
          };
        }
      }

      return { prefix: [children.trim()], arrowPiece: null, suffix: null };
    }

    return { prefix: children ? [children] : null, arrowPiece: null, suffix: null };
  }, [children, arrow]);

  // Dynamically measure real DOM offsets with zero hardcoding
  const measure = useCallback(() => {
    if (!containerRef.current || !targetRef.current) return;

    const targetEl = targetRef.current;
    const suffixEl = suffixRef.current;
    const arrowEl = arrowRef.current;

    // Real measured target text width
    const targetWidth = targetEl.offsetWidth;

    // Real measured arrow icon width from SVG DOM
    const iconEl = arrowEl?.querySelector("svg") || arrowEl?.firstElementChild;
    const arrowWidth = iconEl
      ? iconEl.getBoundingClientRect().width
      : (arrowEl ? arrowEl.getBoundingClientRect().width : targetWidth);

    const widthDiff = (arrowWidth - targetWidth) / 2;

    if (suffixEl && suffixEl.offsetWidth > 0) {
      const targetLeft = targetEl.offsetLeft;
      const suffixLeft = suffixEl.offsetLeft;
      const suffixWidth = suffixEl.offsetWidth;

      // Natural space between target and suffix as rendered by the font
      const naturalSpace = Math.max(0, suffixLeft - (targetLeft + targetWidth));

      // Suffix moves left to occupy target's original position
      const sShift = targetLeft - suffixLeft;

      // Target moves right past suffix, adjusted so the arrow icon aligns with natural space
      const tShift = suffixWidth + naturalSpace + widthDiff;

      // Center offset to keep the entire content 100% dead-centered on hover
      const cOffset = widthDiff;

      setShifts({
        targetShift: tShift,
        suffixShift: sShift,
        centerOffset: cOffset,
      });
    } else {
      // No suffix text: target stays in place, compensating only for arrow centering
      setShifts({
        targetShift: widthDiff,
        suffixShift: 0,
        centerOffset: widthDiff,
      });
    }
  }, []);

  const useIsomorphicLayoutEffect =
    typeof window !== "undefined" ? useLayoutEffect : useEffect;

  useIsomorphicLayoutEffect(() => {
    measure();
  }, [measure, parsed]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    window.addEventListener("resize", measure);

    // Continuous dynamic resize tracking via ResizeObserver
    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined" && containerRef.current) {
      resizeObserver = new ResizeObserver(() => {
        measure();
      });
      resizeObserver.observe(containerRef.current);
    }

    if (document.fonts) {
      document.fonts.ready.then(measure);
    }

    return () => {
      window.removeEventListener("resize", measure);
      resizeObserver?.disconnect();
    };
  }, [measure]);

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement & HTMLAnchorElement>) => {
    setInternalHovered(true);
    onMouseEnter?.(e as any);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement & HTMLAnchorElement>) => {
    setInternalHovered(false);
    onMouseLeave?.(e as any);
  };

  // Progress runs from 0 to 1 with smooth symmetrical ease-in-out
  const progress = useMotionValue(0);

  useEffect(() => {
    const controls = animate(progress, isHovered ? 1 : 0, {
      duration: 0.38,
      ease: [0.4, 0, 0.2, 1], // Symmetrical ease so midway = 50% distance
    });
    return () => controls.stop();
  }, [isHovered, progress]);

  // Derived transforms:
  // Container translates by -centerOffset to lock the visual center at 50%
  const containerX = useTransform(progress, [0, 1], [0, -shifts.centerOffset]);
  const targetX = useTransform(progress, [0, 1], [0, shifts.targetShift]);
  const suffixX = useTransform(progress, [0, 1], [0, shifts.suffixShift]);

  // Smooth midway crossfade:
  const textOpacity = useTransform(progress, [0.35, 0.65], [1, 0]);
  const arrowOpacity = useTransform(progress, [0.35, 0.65], [0, 1]);

  const content = (
    <motion.span
      ref={containerRef}
      className="inline-flex items-center justify-center select-none"
      style={{ x: containerX }}
    >
      {/* 1. Prefix (e.g. "Start") */}
      {parsed.prefix && (
        <span className="inline-block whitespace-nowrap">{parsed.prefix}</span>
      )}

      {/* Natural spacing between prefix and arrow piece */}
      {parsed.prefix && parsed.arrowPiece && <span>&nbsp;</span>}

      {/* If there is an arrow piece to animate */}
      {parsed.arrowPiece ? (
        <>
          {/* 2. Target piece: natural text in idle, slides right on hover */}
          <motion.span
            ref={targetRef}
            className="relative inline-flex items-center justify-center shrink-0"
            style={{ x: targetX }}
          >
            {/* Initial text piece (e.g. "it" or "a") */}
            <motion.span
              className="inline-block whitespace-nowrap"
              style={{ opacity: textOpacity }}
            >
              {parsed.arrowPiece}
            </motion.span>

            {/* Target Arrow Icon */}
            <motion.span
              ref={arrowRef}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              style={{ opacity: arrowOpacity }}
            >
              {arrowIcon || <DefaultArrowIcon />}
            </motion.span>
          </motion.span>

          {/* Natural spacing between arrow piece and suffix */}
          {parsed.suffix && <span>&nbsp;</span>}

          {/* 3. Suffix (e.g. "Now" or "project", glides LEFT on hover) */}
          {parsed.suffix && (
            <motion.span
              ref={suffixRef}
              className="inline-block whitespace-nowrap"
              style={{ x: suffixX }}
            >
              {parsed.suffix}
            </motion.span>
          )}
        </>
      ) : (
        parsed.suffix && (
          <span className="inline-block whitespace-nowrap">{parsed.suffix}</span>
        )
      )}
    </motion.span>
  );

  const sharedClasses = cn(
    "relative inline-flex shrink-0 items-center justify-center rounded-full font-medium whitespace-nowrap transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 cursor-pointer disabled:pointer-events-none disabled:opacity-50",
    SIZE_STYLES[size],
    VARIANT_STYLES[variant],
    className
  );

  if (href && !disabled) {
    return (
      <Link
        ref={forwardedRef as any}
        href={href}
        className={sharedClasses}
        onMouseEnter={handleMouseEnter as any}
        onMouseLeave={handleMouseLeave as any}
        onClick={onClick as any}
        {...(props as any)}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      ref={forwardedRef as any}
      type="button"
      className={sharedClasses}
      disabled={disabled}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      {...props}
    >
      {content}
    </button>
  );
});

(GlideButton as any).Arrow = Arrow;

// Convenient aliases so any naming works seamlessly
export const ArrowButton = GlideButton;
export const LinkButton = GlideButton;
export type ArrowButtonProps = GlideButtonProps;
export type LinkButtonProps = GlideButtonProps;

export default GlideButton;
