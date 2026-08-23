"use client";

import type { ButtonVariants } from "@bunui/styles";
import type { ComponentPropsWithRef } from "react";

import gsap from "gsap";
import {useEffect, useRef} from "react";
import {buttonVariants, cx} from "@bunui/styles";
import { Button as ButtonPrimitive } from "react-aria-components/Button";
import { composeRenderProps } from "react-aria-components/composeRenderProps";

export interface ButtonProps
  extends ComponentPropsWithRef<typeof ButtonPrimitive>, ButtonVariants {}

export function Button({
  className,
  fullWidth,
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
  const styles = buttonVariants({ fullWidth, isIconOnly, size, variant });

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
    tweenRef.current = gsap.to(button, {
      duration: 0.14,
      ease: "power3.out",
      overwrite: "auto",
      scaleX: 1.025,
      scaleY: 1.025,
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
    tweenRef.current = gsap.to(button, {
      duration: 0.18,
      ease: "power3.out",
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
    const targetScale = isHoveredRef.current ? 1.025 : 1;

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
      className={composeRenderProps(className, (value) => cx(styles, value) ?? "")}
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

export { buttonVariants } from "@bunui/styles";
export type { ButtonVariants } from "@bunui/styles";
