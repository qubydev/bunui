"use client"

import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import {
  motion,
  type MotionProps,
  useAnimationControls,
  useReducedMotion,
} from "motion/react"
import type * as React from "react"

import { cn } from "@/lib/utils"

const MotionButtonPrimitive = motion.create(ButtonPrimitive) as React.ComponentType<
  Omit<ButtonPrimitive.Props, keyof MotionProps> & MotionProps
>

type ButtonProps = Omit<ButtonPrimitive.Props, keyof MotionProps> &
  MotionProps &
  VariantProps<typeof buttonVariants> & {
    animated?: boolean
  }

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center gap-2 rounded-md border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap outline-none select-none transition-colors will-change-transform focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/80",
        outline:
          "border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost:
          "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3.5",
        xs: "h-7 gap-1.5 px-2.5 text-xs has-[>svg]:px-2",
        sm: "h-8 gap-1.5 px-3 text-sm has-[>svg]:px-2.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-10 px-5 text-sm has-[>svg]:px-4",
        icon: "size-9",
        "icon-xs": "size-7 [&_svg:not([class*='size-'])]:size-3.5",
        "icon-sm": "size-8 [&_svg:not([class*='size-'])]:size-3.5",
        "icon-lg": "size-10 [&_svg:not([class*='size-'])]:size-4.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  disabled,
  animated = true,
  onKeyDown,
  onKeyUp,
  onPointerCancel,
  onPointerDown,
  onPointerUp,
  style,
  ...props
}: ButtonProps) {
  const controls = useAnimationControls()
  const reduceMotion = useReducedMotion()

  const press = () => {
    if (!animated || disabled || reduceMotion) {
      return
    }

    void controls.start({
      scaleX: 1.08,
      scaleY: 0.92,
      transition: { type: "spring", stiffness: 620, damping: 22, mass: 0.5 },
    })
  }

  const release = () => {
    if (!animated || disabled || reduceMotion) {
      return
    }

    void controls.start({
      scaleX: [1.08, 0.97, 1.02, 1],
      scaleY: [0.92, 1.04, 0.99, 1],
      transition: {
        duration: 0.36,
        ease: [0.22, 1, 0.36, 1],
        times: [0, 0.35, 0.7, 1],
      },
    })
  }

  const handlePointerDown: NonNullable<ButtonProps["onPointerDown"]> = (
    event
  ) => {
    onPointerDown?.(event)
    press()
  }

  const handlePointerUp: NonNullable<ButtonProps["onPointerUp"]> = (event) => {
    onPointerUp?.(event)
    release()
  }

  const handlePointerCancel: NonNullable<ButtonProps["onPointerCancel"]> = (
    event
  ) => {
    onPointerCancel?.(event)
    release()
  }

  const handleKeyDown: NonNullable<ButtonProps["onKeyDown"]> = (event) => {
    onKeyDown?.(event)

    if (event.key === " " || event.key === "Enter") {
      press()
    }
  }

  const handleKeyUp: NonNullable<ButtonProps["onKeyUp"]> = (event) => {
    onKeyUp?.(event)

    if (event.key === " " || event.key === "Enter") {
      release()
    }
  }

  return (
    <MotionButtonPrimitive
      animate={controls}
      data-slot="button"
      disabled={disabled}
      className={cn(buttonVariants({ variant, size, className }))}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      onPointerCancel={handlePointerCancel}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      style={{ transformOrigin: "center", ...style }}
      {...props}
    />
  )
}

export { Button, buttonVariants }
