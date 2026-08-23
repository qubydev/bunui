"use client";

import type { ButtonVariants } from "@bunui/styles";
import type { ComponentPropsWithRef } from "react";

import { buttonVariants } from "@bunui/styles";
import { Button as ButtonPrimitive } from "react-aria-components/Button";
import { composeRenderProps } from "react-aria-components/composeRenderProps";
import { cx } from "tailwind-variants";

export interface ButtonProps
  extends ComponentPropsWithRef<typeof ButtonPrimitive>, ButtonVariants {}

export function Button({
  className,
  fullWidth,
  isIconOnly,
  size,
  variant,
  ...props
}: ButtonProps) {
  const styles = buttonVariants({ fullWidth, isIconOnly, size, variant });

  return (
    <ButtonPrimitive
      {...props}
      data-slot="button"
      className={composeRenderProps(className, (value) => cx(styles, value) ?? "")}
    />
  );
}

export { buttonVariants } from "@bunui/styles";
export type { ButtonVariants } from "@bunui/styles";
