"use client"

import {Input as InputPrimitive} from "@base-ui/react/input"
import {
  motion,
  type MotionProps,
  useAnimationControls,
  useReducedMotion,
} from "motion/react"
import type * as React from "react"

import {cn} from "@/lib/utils"

const MotionInputPrimitive = motion.create(InputPrimitive) as React.ComponentType<
  Omit<InputPrimitive.Props, keyof MotionProps> & MotionProps
>

type InputProps = Omit<InputPrimitive.Props, keyof MotionProps> &
  MotionProps & {
    animated?: boolean
  }

function Input({
  className,
  type,
  disabled,
  animated = true,
  onBlur,
  onFocus,
  style,
  ...props
}: InputProps) {
  const controls = useAnimationControls()
  const reduceMotion = useReducedMotion()

  const focus = () => {
    if (!animated || disabled || reduceMotion) {
      return
    }

    void controls.start({
      scaleX: [1, 1.012, 0.998, 1],
      scaleY: [1, 0.985, 1.006, 1],
      transition: {
        duration: 0.34,
        ease: [0.22, 1, 0.36, 1],
        times: [0, 0.38, 0.72, 1],
      },
    })
  }

  const blur = () => {
    if (!animated || disabled || reduceMotion) {
      return
    }

    void controls.start({
      scaleX: 1,
      scaleY: 1,
      transition: {type: "spring", stiffness: 520, damping: 24, mass: 0.55},
    })
  }

  const handleFocus: NonNullable<InputProps["onFocus"]> = (event) => {
    onFocus?.(event)
    focus()
  }

  const handleBlur: NonNullable<InputProps["onBlur"]> = (event) => {
    onBlur?.(event)
    blur()
  }

  return (
    <MotionInputPrimitive
      animate={controls}
      type={type}
      data-slot="input"
      disabled={disabled}
      className={cn(
        "h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base outline-none transition-colors will-change-transform file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        className
      )}
      onBlur={handleBlur}
      onFocus={handleFocus}
      style={{transformOrigin: "center", ...style}}
      {...props}
    />
  )
}

export {Input}
