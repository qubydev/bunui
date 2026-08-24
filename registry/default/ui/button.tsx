"use client";

import type {ComponentPropsWithRef} from "react";

import gsap from "gsap";
import {useEffect, useRef} from "react";
import {Button as ButtonPrimitive} from "react-aria-components/Button";
import {composeRenderProps} from "react-aria-components/composeRenderProps";
import {tv, type VariantProps} from "tailwind-variants";

export const buttonVariants = tv({
  base: [
    "relative isolate inline-flex h-10 w-fit origin-center transform-gpu items-center justify-center gap-2 rounded-full px-4 text-sm font-medium whitespace-nowrap outline-none select-none",
    "bg-[var(--button-bg)] text-[var(--button-fg)] will-change-transform hover:bg-[var(--button-bg-hover)]",
    "transition-[background-color,box-shadow] duration-100",
    "disabled:pointer-events-none disabled:opacity-50",
    "data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
    "focus-visible:ring-2 focus-visible:ring-[var(--focus,var(--ring))] focus-visible:ring-offset-2",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  ],
  defaultVariants: {
    isIconOnly: false,
    size: "md",
    variant: "primary",
  },
  variants: {
    isIconOnly: {
      true: "w-10 px-0",
    },
    size: {
      lg: "h-11 px-5 text-base",
      md: "h-10 px-4 text-sm",
      sm: "h-9 px-3 text-sm",
    },
    variant: {
      danger:
        "[--button-bg:var(--danger,var(--destructive))] [--button-bg-hover:var(--danger-hover,var(--destructive))] [--button-fg:var(--danger-foreground,var(--destructive-foreground))]",
      "danger-soft":
        "[--button-bg:var(--danger-soft,color-mix(in_oklab,var(--destructive)_12%,transparent))] [--button-bg-hover:var(--danger-soft-hover,color-mix(in_oklab,var(--destructive)_18%,transparent))] [--button-fg:var(--danger-soft-foreground,var(--destructive))]",
      ghost:
        "[--button-bg:transparent] [--button-bg-hover:var(--default,var(--accent))] [--button-fg:var(--default-foreground,var(--foreground))] hover:text-[var(--button-fg)]",
      outline:
        "border border-[var(--border)] [--button-bg:transparent] [--button-bg-hover:color-mix(in_oklab,var(--default,var(--accent))_60%,transparent)] [--button-fg:var(--default-foreground,var(--foreground))] hover:text-[var(--button-fg)]",
      primary:
        "[--button-bg:var(--accent,var(--primary))] [--button-bg-hover:var(--accent-hover,var(--primary))] [--button-fg:var(--accent-foreground,var(--primary-foreground))]",
      secondary:
        "[--button-bg:var(--default,var(--secondary))] [--button-bg-hover:var(--default-hover,var(--secondary))] [--button-fg:var(--accent-soft-foreground,var(--secondary-foreground))]",
      success:
        "[--button-bg:var(--success)] [--button-bg-hover:var(--success-hover)] [--button-fg:var(--success-foreground)]",
      "success-soft":
        "[--button-bg:var(--success-soft)] [--button-bg-hover:var(--success-soft-hover)] [--button-fg:var(--success-soft-foreground)]",
      transparent:
        "[--button-bg:transparent] [--button-bg-hover:transparent] [--button-fg:var(--foreground)] hover:text-[var(--button-fg)]",
    },
  },
  compoundVariants: [
    {
      isIconOnly: true,
      size: "sm",
      class: "w-9 px-0",
    },
    {
      isIconOnly: true,
      size: "md",
      class: "w-10 px-0",
    },
    {
      isIconOnly: true,
      size: "lg",
      class: "w-11 px-0",
    },
  ],
});

export interface ButtonProps
  extends ComponentPropsWithRef<typeof ButtonPrimitive>,
    VariantProps<typeof buttonVariants> {}

export function Button({
  className,
  isIconOnly,
  onPointerCancel,
  onPointerDown,
  onPointerEnter,
  onPointerLeave,
  onPointerUp,
  ref,
  size,
  variant,
  ...props
}: ButtonProps) {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const tweenRef = useRef<gsap.core.Timeline | gsap.core.Tween | null>(null);
  const isHoveredRef = useRef(false);
  const isPressedRef = useRef(false);

  useEffect(() => {
    return () => {
      tweenRef.current?.kill();
    };
  }, []);

  const setRef = (node: HTMLButtonElement | null) => {
    buttonRef.current = node;

    if (typeof ref === "function") {
      ref(node);
      return;
    }

    if (ref) {
      ref.current = node;
    }
  };

  const press = () => {
    const button = buttonRef.current;

    if (!button) {
      return;
    }

    isPressedRef.current = true;
    tweenRef.current?.kill();
    tweenRef.current = gsap.to(button, {
      duration: 0.08,
      ease: "power2.out",
      overwrite: "auto",
      scaleX: 1.08,
      scaleY: 0.9,
      transformOrigin: "50% 50%",
      x: 0,
      y: 0,
    });
  };

  const hover = () => {
    const button = buttonRef.current;

    if (!button || isPressedRef.current) {
      return;
    }

    isHoveredRef.current = true;
    tweenRef.current?.kill();
    tweenRef.current = gsap
      .timeline()
      .to(button, {
        duration: 0.08,
        ease: "power2.out",
        overwrite: "auto",
        scaleX: 1.045,
        scaleY: 0.96,
        transformOrigin: "50% 50%",
        x: 0,
        y: 0,
      })
      .to(button, {
        duration: 0.16,
        ease: "back.out(2.2)",
        overwrite: "auto",
        scaleX: 1.015,
        scaleY: 1.015,
        transformOrigin: "50% 50%",
        x: 0,
        y: 0,
      });
  };

  const leave = () => {
    const button = buttonRef.current;

    isHoveredRef.current = false;

    if (!button || isPressedRef.current) {
      return;
    }

    tweenRef.current?.kill();
    tweenRef.current = gsap
      .timeline()
      .to(button, {
        duration: 0.07,
        ease: "power2.out",
        overwrite: "auto",
        scaleX: 0.985,
        scaleY: 1.025,
        transformOrigin: "50% 50%",
        x: 0,
        y: 0,
      })
      .to(button, {
        duration: 0.18,
        ease: "elastic.out(1, 0.55)",
        overwrite: "auto",
        scaleX: 1,
        scaleY: 1,
        transformOrigin: "50% 50%",
        x: 0,
        y: 0,
      });
  };

  const release = () => {
    const button = buttonRef.current;

    if (!button || !isPressedRef.current) {
      return;
    }

    isPressedRef.current = false;
    const targetScale = isHoveredRef.current ? 1.015 : 1;

    tweenRef.current?.kill();
    tweenRef.current = gsap
      .timeline()
      .to(button, {
        duration: 0.08,
        ease: "power2.out",
        overwrite: "auto",
        scaleX: 0.95,
        scaleY: 1.08,
        transformOrigin: "50% 50%",
        x: 0,
        y: 0,
      })
      .to(button, {
        duration: 0.08,
        ease: "power2.out",
        overwrite: "auto",
        scaleX: 1.045,
        scaleY: 0.97,
        transformOrigin: "50% 50%",
        x: 0,
        y: 0,
      })
      .to(button, {
        duration: 0.07,
        ease: "power2.out",
        overwrite: "auto",
        scaleX: 0.985,
        scaleY: 1.025,
        transformOrigin: "50% 50%",
        x: 0,
        y: 0,
      })
      .to(button, {
        duration: 0.2,
        ease: "elastic.out(1, 0.5)",
        overwrite: "auto",
        scaleX: targetScale,
        scaleY: targetScale,
        transformOrigin: "50% 50%",
        x: 0,
        y: 0,
      });
  };

  return (
    <ButtonPrimitive
      {...props}
      data-slot="button"
      ref={setRef}
      className={composeRenderProps(className, (value) =>
        buttonVariants({class: value, isIconOnly, size, variant}),
      )}
      onPointerCancel={(event) => {
        onPointerCancel?.(event);
        release();
      }}
      onPointerDown={(event) => {
        onPointerDown?.(event);
        press();
      }}
      onPointerEnter={(event) => {
        onPointerEnter?.(event);
        hover();
      }}
      onPointerLeave={(event) => {
        onPointerLeave?.(event);
        if (isPressedRef.current) {
          isHoveredRef.current = false;
          release();
          return;
        }

        leave();
      }}
      onPointerUp={(event) => {
        onPointerUp?.(event);
        release();
      }}
    />
  );
}
