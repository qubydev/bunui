"use client"

import {
  motion,
  type MotionProps,
  useAnimationControls,
  useReducedMotion,
} from "motion/react"
import { useRef } from "react"
import type * as React from "react"

import { cn } from "@/lib/utils"

const MotionTextarea = motion.textarea as React.ComponentType<
  Omit<React.ComponentProps<"textarea">, keyof MotionProps> & MotionProps
>

type TextareaProps = Omit<React.ComponentProps<"textarea">, keyof MotionProps> &
  MotionProps & {
    animated?: boolean
  }

function Textarea({
  animated = true,
  className,
  disabled,
  onBlur,
  onFocus,
  onPaste,
  onPointerCancel,
  onPointerDown,
  onPointerLeave,
  onPointerUp,
  style,
  ...props
}: TextareaProps) {
  const controls = useAnimationControls()
  const reduceMotion = useReducedMotion()
  const isPressedRef = useRef(false)

  const focus = () => {
    if (isPressedRef.current) {
      return
    }

    if (!animated || disabled || reduceMotion) {
      return
    }

    void controls.start({
      scaleX: [1, 1.006, 0.998, 1],
      scaleY: [1, 0.992, 1.003, 1],
      transition: {
        duration: 0.34,
        ease: [0.22, 1, 0.36, 1],
        times: [0, 0.38, 0.72, 1],
      },
    })
  }

  const blur = () => {
    isPressedRef.current = false

    if (!animated || disabled || reduceMotion) {
      return
    }

    void controls.start({
      scaleX: 1,
      scaleY: 1,
      transition: { type: "spring", stiffness: 520, damping: 24, mass: 0.55 },
    })
  }

  const press = () => {
    if (!animated || disabled || reduceMotion) {
      return
    }

    isPressedRef.current = true
    void controls.start({
      scaleX: 1.006,
      scaleY: 0.992,
      transition: { type: "spring", stiffness: 560, damping: 24, mass: 0.5 },
    })
  }

  const release = () => {
    if (!isPressedRef.current) {
      return
    }

    isPressedRef.current = false

    if (!animated || disabled || reduceMotion) {
      return
    }

    void controls.start({
      scaleX: [1.006, 0.998, 1.003, 1],
      scaleY: [0.992, 1.003, 0.999, 1],
      transition: {
        duration: 0.34,
        ease: [0.22, 1, 0.36, 1],
        times: [0, 0.38, 0.72, 1],
      },
    })
  }

  const paste = () => {
    if (!animated || disabled || reduceMotion) {
      return
    }

    void controls.start({
      scaleX: [1, 1.006, 0.998, 1.003, 1],
      scaleY: [1, 0.992, 1.003, 0.999, 1],
      transition: {
        duration: 0.34,
        ease: [0.22, 1, 0.36, 1],
        times: [0, 0.28, 0.58, 0.82, 1],
      },
    })
  }

  const handleFocus: NonNullable<TextareaProps["onFocus"]> = (event) => {
    onFocus?.(event)
    focus()
  }

  const handleBlur: NonNullable<TextareaProps["onBlur"]> = (event) => {
    onBlur?.(event)
    blur()
  }

  const handlePaste: NonNullable<TextareaProps["onPaste"]> = (event) => {
    onPaste?.(event)

    if (!event.defaultPrevented) {
      paste()
    }
  }

  const handlePointerDown: NonNullable<TextareaProps["onPointerDown"]> = (
    event
  ) => {
    onPointerDown?.(event)
    press()
  }

  const handlePointerUp: NonNullable<TextareaProps["onPointerUp"]> = (
    event
  ) => {
    onPointerUp?.(event)
    release()
  }

  const handlePointerCancel: NonNullable<TextareaProps["onPointerCancel"]> = (
    event
  ) => {
    onPointerCancel?.(event)
    release()
  }

  const handlePointerLeave: NonNullable<TextareaProps["onPointerLeave"]> = (
    event
  ) => {
    onPointerLeave?.(event)
    release()
  }

  return (
    <MotionTextarea
      animate={controls}
      data-slot="textarea"
      disabled={disabled}
      className={cn(
        "field-sizing-content min-h-16 w-full rounded-md border border-input bg-transparent px-3 py-2 text-base outline-none transition-colors will-change-transform placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        className
      )}
      onBlur={handleBlur}
      onFocus={handleFocus}
      onPaste={handlePaste}
      onPointerCancel={handlePointerCancel}
      onPointerDown={handlePointerDown}
      onPointerLeave={handlePointerLeave}
      onPointerUp={handlePointerUp}
      style={{ transformOrigin: "center", ...style }}
      {...props}
    />
  )
}

export { Textarea }
