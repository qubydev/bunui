"use client"

import { Switch as SwitchPrimitive } from "@base-ui/react/switch"
import {
  motion,
  type MotionProps,
  useAnimationControls,
  useReducedMotion,
} from "motion/react"
import { useRef, useState } from "react"
import type * as React from "react"

import { cn } from "@/lib/utils"

const MotionSwitchRoot = motion.create(
  SwitchPrimitive.Root
) as React.ComponentType<
  Omit<SwitchPrimitive.Root.Props, keyof MotionProps> & MotionProps
>

type SwitchProps = Omit<SwitchPrimitive.Root.Props, keyof MotionProps> &
  MotionProps & {
    animated?: boolean
    size?: "sm" | "default"
  }

function Switch({
  animated = true,
  className,
  disabled,
  onKeyDown,
  onKeyUp,
  onCheckedChange,
  onPointerCancel,
  onPointerDown,
  onPointerLeave,
  onPointerUp,
  size = "default",
  style,
  ...props
}: SwitchProps) {
  const controls = useAnimationControls()
  const thumbControls = useAnimationControls()
  const reduceMotion = useReducedMotion()
  const isPressedRef = useRef(false)
  const [thumbOrigin, setThumbOrigin] =
    useState<React.CSSProperties["transformOrigin"]>("center")

  const press = () => {
    if (!animated || disabled || reduceMotion) {
      return
    }

    isPressedRef.current = true
    void controls.start({
      scaleX: 1.04,
      scaleY: 0.96,
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
      scaleX: [1.04, 0.985, 1.01, 1],
      scaleY: [0.96, 1.02, 0.995, 1],
      transition: {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1],
        times: [0, 0.35, 0.72, 1],
      },
    })
  }

  const stretchThumb = (checked: boolean) => {
    if (!animated || disabled || reduceMotion) {
      return
    }

    setThumbOrigin(checked ? "right center" : "left center")
    void thumbControls.start({
      scaleX: [1, 1.38, 0.9, 1.08, 1],
      scaleY: [1, 0.88, 1.12, 0.98, 1],
      transition: {
        duration: 0.42,
        ease: [0.22, 1, 0.36, 1],
        times: [0, 0.28, 0.58, 0.8, 1],
      },
    })
  }

  const handleCheckedChange: NonNullable<SwitchProps["onCheckedChange"]> = (
    checked,
    eventDetails
  ) => {
    onCheckedChange?.(checked, eventDetails)
    stretchThumb(checked)
  }

  const handlePointerDown: NonNullable<SwitchProps["onPointerDown"]> = (
    event
  ) => {
    onPointerDown?.(event)
    press()
  }

  const handlePointerUp: NonNullable<SwitchProps["onPointerUp"]> = (event) => {
    onPointerUp?.(event)
    release()
  }

  const handlePointerCancel: NonNullable<SwitchProps["onPointerCancel"]> = (
    event
  ) => {
    onPointerCancel?.(event)
    release()
  }

  const handlePointerLeave: NonNullable<SwitchProps["onPointerLeave"]> = (
    event
  ) => {
    onPointerLeave?.(event)
    release()
  }

  const handleKeyDown: NonNullable<SwitchProps["onKeyDown"]> = (event) => {
    onKeyDown?.(event)

    if (event.key === " " || event.key === "Enter") {
      press()
    }
  }

  const handleKeyUp: NonNullable<SwitchProps["onKeyUp"]> = (event) => {
    onKeyUp?.(event)

    if (event.key === " " || event.key === "Enter") {
      release()
    }
  }

  return (
    <MotionSwitchRoot
      animate={controls}
      data-size={size}
      data-slot="switch"
      disabled={disabled}
      className={cn(
        "peer group/switch relative inline-flex h-6 w-10 shrink-0 items-center rounded-full border border-transparent bg-input p-0.5 outline-none transition-colors will-change-transform after:absolute after:-inset-x-3 after:-inset-y-2 [--switch-thumb-translate:1rem] focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 data-[checked]:bg-primary data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[size=sm]:h-5 data-[size=sm]:w-8 data-[size=sm]:[--switch-thumb-translate:0.75rem] aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:bg-input/80 dark:data-[checked]:bg-primary dark:aria-invalid:ring-destructive/40",
        className
      )}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      onCheckedChange={handleCheckedChange}
      onPointerCancel={handlePointerCancel}
      onPointerDown={handlePointerDown}
      onPointerLeave={handlePointerLeave}
      onPointerUp={handlePointerUp}
      style={{ transformOrigin: "center", ...style }}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className="pointer-events-none block size-5 transition-transform duration-200 will-change-transform group-data-[checked]/switch:translate-x-[var(--switch-thumb-translate)] group-data-[size=sm]/switch:size-4 rtl:group-data-[checked]/switch:-translate-x-[var(--switch-thumb-translate)]"
      >
        <motion.span
          animate={thumbControls}
          className="block size-full rounded-full bg-background shadow-sm ring-0 will-change-transform dark:bg-foreground"
          style={{ transformOrigin: thumbOrigin }}
        />
      </SwitchPrimitive.Thumb>
    </MotionSwitchRoot>
  )
}

export { Switch }
