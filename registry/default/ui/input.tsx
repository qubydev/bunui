"use client";

import type {ComponentPropsWithRef} from "react";

import gsap from "gsap";
import {useEffect, useRef} from "react";
import {tv, type VariantProps} from "tailwind-variants";

export const inputVariants = tv({
  base: [
    "h-10 w-full min-w-0 origin-center transform-gpu rounded-field border border-field-border bg-field px-3 text-sm text-field-foreground outline-none",
    "placeholder:text-field-placeholder disabled:pointer-events-none disabled:opacity-50",
    "transition-[background-color,border-color,box-shadow] duration-150 will-change-transform",
    "hover:border-field-border-hover",
    "focus:border-field-border-focus focus:bg-field-focus focus:ring-2 focus:ring-focus/20",
  ],
  defaultVariants: {
    size: "md",
  },
  variants: {
    size: {
      sm: "h-9 px-3 text-sm",
      md: "h-10 px-3 text-sm",
      lg: "h-11 px-3.5 text-base",
    },
  },
});

export interface InputProps
  extends Omit<ComponentPropsWithRef<"input">, "size">,
    VariantProps<typeof inputVariants> {}

export function Input({
  className,
  onBlur,
  onFocus,
  onPointerCancel,
  onPointerDown,
  onPointerEnter,
  onPointerLeave,
  onPointerUp,
  ref,
  size,
  ...props
}: InputProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const tweenRef = useRef<gsap.core.Timeline | gsap.core.Tween | null>(null);
  const reduceMotionRef = useRef(false);
  const focusedRef = useRef(false);
  const hoveredRef = useRef(false);
  const pressedRef = useRef(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => {
      reduceMotionRef.current = query.matches;
    };

    updateMotionPreference();
    query.addEventListener("change", updateMotionPreference);

    return () => {
      query.removeEventListener("change", updateMotionPreference);
      tweenRef.current?.kill();
    };
  }, []);

  const setRef = (node: HTMLInputElement | null) => {
    inputRef.current = node;

    if (typeof ref === "function") {
      ref(node);
      return;
    }

    if (ref) {
      ref.current = node;
    }
  };

  const canAnimate = () => {
    const input = inputRef.current;
    return input && !reduceMotionRef.current && !input.disabled;
  };

  const animate = (vars: gsap.TweenVars) => {
    const input = inputRef.current;
    if (!input) return;

    tweenRef.current?.kill();
    tweenRef.current = gsap.to(input, {
      overwrite: "auto",
      transformOrigin: "50% 50%",
      x: 0,
      y: 0,
      ...vars,
    });
  };

  const settle = () => {
    if (!canAnimate()) return;

    animate({
      duration: 0.3,
      ease: "elastic.out(1, 0.58)",
      scaleX: focusedRef.current ? 1.008 : hoveredRef.current ? 1.004 : 1,
      scaleY: focusedRef.current ? 1.004 : 1,
    });
  };

  return (
    <input
      {...props}
      data-slot="input"
      ref={setRef}
      className={inputVariants({class: className, size})}
      onBlur={(event) => {
        onBlur?.(event);
        focusedRef.current = false;
        pressedRef.current = false;

        if (!canAnimate()) return;

        const input = inputRef.current;
        tweenRef.current?.kill();
        tweenRef.current = gsap
          .timeline()
          .to(input, {
            duration: 0.08,
            ease: "power2.out",
            scaleX: 0.992,
            scaleY: 1.018,
          })
          .to(input, {
            duration: 0.28,
            ease: "elastic.out(1, 0.6)",
            scaleX: hoveredRef.current ? 1.004 : 1,
            scaleY: 1,
          });
      }}
      onFocus={(event) => {
        onFocus?.(event);
        focusedRef.current = true;

        if (!canAnimate()) return;

        const input = inputRef.current;
        tweenRef.current?.kill();
        tweenRef.current = gsap
          .timeline()
          .to(input, {
            duration: 0.09,
            ease: "power2.out",
            scaleX: 1.018,
            scaleY: 0.986,
          })
          .to(input, {
            duration: 0.24,
            ease: "back.out(2)",
            scaleX: 1.008,
            scaleY: 1.004,
          });
      }}
      onPointerCancel={(event) => {
        onPointerCancel?.(event);
        pressedRef.current = false;
        settle();
      }}
      onPointerDown={(event) => {
        onPointerDown?.(event);
        if (event.button !== 0 || !canAnimate()) return;

        pressedRef.current = true;
        animate({
          duration: 0.08,
          ease: "power2.out",
          scaleX: 0.994,
          scaleY: 0.97,
        });
      }}
      onPointerEnter={(event) => {
        onPointerEnter?.(event);
        hoveredRef.current = true;
        if (!canAnimate() || focusedRef.current || pressedRef.current) return;

        animate({
          duration: 0.18,
          ease: "back.out(1.8)",
          scaleX: 1.006,
          scaleY: 0.998,
        });
      }}
      onPointerLeave={(event) => {
        onPointerLeave?.(event);
        hoveredRef.current = false;
        if (!canAnimate() || pressedRef.current) return;

        settle();
      }}
      onPointerUp={(event) => {
        onPointerUp?.(event);
        if (!pressedRef.current) return;

        pressedRef.current = false;
        settle();
      }}
    />
  );
}
