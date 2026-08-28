"use client"

import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox"
import {
  motion,
  type MotionProps,
  useAnimationControls,
  useReducedMotion,
} from "motion/react"
import { useRef } from "react"
import type * as React from "react"

import { cn } from "@/lib/utils"

const MotionCheckboxRoot = motion.create(
  CheckboxPrimitive.Root
) as React.ComponentType<
  Omit<CheckboxPrimitive.Root.Props, keyof MotionProps> & MotionProps
>

type CheckboxProps = Omit<CheckboxPrimitive.Root.Props, keyof MotionProps> &
  MotionProps & {
    animated?: boolean
  }

function Checkbox({
  animated = true,
  className,
  disabled,
  onKeyDown,
  onKeyUp,
  onPointerCancel,
  onPointerDown,
  onPointerLeave,
  onPointerUp,
  style,
  ...props
}: CheckboxProps) {
  const controls = useAnimationControls()
  const reduceMotion = useReducedMotion()
  const isPressedRef = useRef(false)

  const press = () => {
    if (!animated || disabled || reduceMotion) {
      return
    }

    isPressedRef.current = true
    void controls.start({
      scaleX: 1.06,
      scaleY: 0.94,
      transition: { type: "spring", stiffness: 560, damping: 24, mass: 0.45 },
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
      scaleX: [1.06, 0.96, 1.02, 1],
      scaleY: [0.94, 1.05, 0.99, 1],
      transition: {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1],
        times: [0, 0.35, 0.72, 1],
      },
    })
  }

  const handlePointerDown: NonNullable<CheckboxProps["onPointerDown"]> = (
    event
  ) => {
    onPointerDown?.(event)
    press()
  }

  const handlePointerUp: NonNullable<CheckboxProps["onPointerUp"]> = (
    event
  ) => {
    onPointerUp?.(event)
    release()
  }

  const handlePointerCancel: NonNullable<CheckboxProps["onPointerCancel"]> = (
    event
  ) => {
    onPointerCancel?.(event)
    release()
  }

  const handlePointerLeave: NonNullable<CheckboxProps["onPointerLeave"]> = (
    event
  ) => {
    onPointerLeave?.(event)
    release()
  }

  const handleKeyDown: NonNullable<CheckboxProps["onKeyDown"]> = (event) => {
    onKeyDown?.(event)

    if (event.key === " " || event.key === "Enter") {
      press()
    }
  }

  const handleKeyUp: NonNullable<CheckboxProps["onKeyUp"]> = (event) => {
    onKeyUp?.(event)

    if (event.key === " " || event.key === "Enter") {
      release()
    }
  }

  return (
    <MotionCheckboxRoot
      animate={controls}
      data-slot="checkbox"
      disabled={disabled}
      className={cn(
        "peer group/checkbox relative size-4 shrink-0 rounded border border-input bg-transparent bg-clip-padding outline-none transition-colors will-change-transform after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 data-[checked]:border-primary data-[checked]:bg-primary data-[checked]:text-primary-foreground data-[indeterminate]:border-primary data-[indeterminate]:bg-primary data-[indeterminate]:text-primary-foreground aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:bg-input/30 dark:data-[checked]:bg-primary dark:data-[indeterminate]:bg-primary dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        className
      )}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      onPointerCancel={handlePointerCancel}
      onPointerDown={handlePointerDown}
      onPointerLeave={handlePointerLeave}
      onPointerUp={handlePointerUp}
      style={{ transformOrigin: "center", ...style }}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        keepMounted
        data-slot="checkbox-indicator"
        render={(indicatorProps, state) => {
          const shouldAnimate = animated && !disabled && !reduceMotion
          const checkTransition = shouldAnimate
            ? {
                pathLength: {
                  type: "spring",
                  stiffness: 520,
                  damping: 32,
                  mass: 0.42,
                },
                opacity: { duration: 0.08 },
                scale: {
                  type: "spring",
                  stiffness: 620,
                  damping: 24,
                  mass: 0.36,
                },
              }
            : { duration: 0 }
          const minusTransition = shouldAnimate
            ? {
                pathLength: {
                  type: "spring",
                  stiffness: 560,
                  damping: 34,
                  mass: 0.38,
                },
                opacity: { duration: 0.08 },
                scaleX: {
                  type: "spring",
                  stiffness: 680,
                  damping: 25,
                  mass: 0.34,
                },
              }
            : { duration: 0 }

          return (
            <span
              {...indicatorProps}
              className={cn(
                "relative grid size-full place-content-center text-primary-foreground",
                indicatorProps.className
              )}
            >
              <motion.svg
                aria-hidden="true"
                className="absolute left-1/2 top-1/2 size-3.5 -translate-x-1/2 -translate-y-1/2"
                fill="none"
                viewBox="0 0 16 16"
              >
                <motion.path
                  animate={{
                    opacity: state.checked && !state.indeterminate ? 1 : 0,
                    pathLength:
                      state.checked && !state.indeterminate ? 1 : 0,
                    scale: state.checked && !state.indeterminate ? 1 : 0.92,
                  }}
                  d="M3.75 8.25 6.75 11.25 12.25 5.25"
                  initial={false}
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  transition={checkTransition}
                />
              </motion.svg>
              <motion.svg
                aria-hidden="true"
                className="absolute left-1/2 top-1/2 size-3.5 -translate-x-1/2 -translate-y-1/2"
                fill="none"
                viewBox="0 0 16 16"
              >
                <motion.path
                  animate={{
                    opacity: state.indeterminate ? 1 : 0,
                    pathLength: state.indeterminate ? 1 : 0,
                    scaleX: state.indeterminate ? 1 : 0.5,
                  }}
                  d="M4 8H12"
                  initial={false}
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="2"
                  transition={minusTransition}
                />
              </motion.svg>
            </span>
          )
        }}
      />
    </MotionCheckboxRoot>
  )
}

export { Checkbox }
