"use client"

import {
  motion,
  type MotionProps,
  useAnimationControls,
  useReducedMotion,
} from "motion/react"
import { createContext, useCallback, useContext, useEffect, useRef } from "react"
import type * as React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

const MotionDiv = motion.div as React.ComponentType<
  Omit<React.ComponentProps<"div">, keyof MotionProps> & MotionProps
>

const MotionKbd = motion.kbd as React.ComponentType<
  Omit<React.ComponentProps<"kbd">, keyof MotionProps> & MotionProps
>

type InputGroupAnimationContextValue = {
  blur: () => void
  focus: () => void
  paste: () => void
  press: () => void
  release: () => void
}

const InputGroupAnimationContext =
  createContext<InputGroupAnimationContextValue | null>(null)

function getModKey() {
  if (typeof navigator === "undefined") {
    return "control"
  }

  return /mac|iphone|ipad|ipod/i.test(navigator.platform) ? "meta" : "control"
}

function normalizeShortcutKey(key: string) {
  const normalized = key.trim().toLowerCase()

  const aliases: Record<string, string> = {
    cmd: "meta",
    command: "meta",
    control: "control",
    ctrl: "control",
    esc: "escape",
    mod: getModKey(),
    option: "alt",
    opt: "alt",
    return: "enter",
    space: " ",
    spacebar: " ",
  }

  return aliases[normalized] ?? normalized
}

function getShortcutKeys(shortcut: string) {
  return shortcut
    .split("+")
    .map(normalizeShortcutKey)
    .filter(Boolean)
}

function syncModifierKeys(event: KeyboardEvent, pressedKeys: Set<string>) {
  if (event.altKey) {
    pressedKeys.add("alt")
  } else {
    pressedKeys.delete("alt")
  }

  if (event.ctrlKey) {
    pressedKeys.add("control")
  } else {
    pressedKeys.delete("control")
  }

  if (event.metaKey) {
    pressedKeys.add("meta")
  } else {
    pressedKeys.delete("meta")
  }

  if (event.shiftKey) {
    pressedKeys.add("shift")
  } else {
    pressedKeys.delete("shift")
  }
}

type InputGroupProps = Omit<React.ComponentProps<"div">, keyof MotionProps> &
  MotionProps & {
    animated?: boolean
  }

function InputGroup({
  animated = true,
  className,
  style,
  ...props
}: InputGroupProps) {
  const controls = useAnimationControls()
  const reduceMotion = useReducedMotion()
  const isPressedRef = useRef(false)

  const focus = () => {
    if (isPressedRef.current) {
      return
    }

    if (!animated || reduceMotion) {
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
    isPressedRef.current = false

    if (!animated || reduceMotion) {
      return
    }

    void controls.start({
      scaleX: 1,
      scaleY: 1,
      transition: { type: "spring", stiffness: 520, damping: 24, mass: 0.55 },
    })
  }

  const press = () => {
    if (!animated || reduceMotion) {
      return
    }

    isPressedRef.current = true
    void controls.start({
      scaleX: 1.012,
      scaleY: 0.985,
      transition: { type: "spring", stiffness: 560, damping: 24, mass: 0.5 },
    })
  }

  const release = () => {
    if (!isPressedRef.current) {
      return
    }

    isPressedRef.current = false

    if (!animated || reduceMotion) {
      return
    }

    void controls.start({
      scaleX: [1.012, 0.998, 1.004, 1],
      scaleY: [0.985, 1.006, 0.998, 1],
      transition: {
        duration: 0.34,
        ease: [0.22, 1, 0.36, 1],
        times: [0, 0.38, 0.72, 1],
      },
    })
  }

  const paste = () => {
    if (!animated || reduceMotion) {
      return
    }

    void controls.start({
      scaleX: [1, 1.012, 0.998, 1.004, 1],
      scaleY: [1, 0.985, 1.006, 0.998, 1],
      transition: {
        duration: 0.34,
        ease: [0.22, 1, 0.36, 1],
        times: [0, 0.28, 0.58, 0.82, 1],
      },
    })
  }

  return (
    <InputGroupAnimationContext.Provider
      value={{ blur, focus, paste, press, release }}
    >
      <MotionDiv
        animate={controls}
        data-slot="input-group"
        className={cn(
          "relative flex min-h-9 w-full min-w-0 flex-wrap items-center overflow-hidden rounded-md border border-input bg-transparent bg-clip-padding text-sm outline-none transition-colors will-change-transform focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50 has-[:disabled]:pointer-events-none has-[:disabled]:opacity-50 has-[[aria-invalid=true]]:border-destructive has-[[aria-invalid=true]]:ring-3 has-[[aria-invalid=true]]:ring-destructive/20 dark:bg-input/30 dark:has-[[aria-invalid=true]]:border-destructive/50 dark:has-[[aria-invalid=true]]:ring-destructive/40",
          className
        )}
        style={{ transformOrigin: "center", ...style }}
        {...props}
      />
    </InputGroupAnimationContext.Provider>
  )
}

type InputGroupInputProps = React.ComponentProps<typeof Input>

function InputGroupInput({
  animated,
  className,
  onBlur,
  onFocus,
  onPaste,
  onPointerCancel,
  onPointerDown,
  onPointerLeave,
  onPointerUp,
  ...props
}: InputGroupInputProps) {
  const inputGroup = useContext(InputGroupAnimationContext)

  const handleFocus: NonNullable<InputGroupInputProps["onFocus"]> = (event) => {
    onFocus?.(event)
    inputGroup?.focus()
  }

  const handleBlur: NonNullable<InputGroupInputProps["onBlur"]> = (event) => {
    onBlur?.(event)
    inputGroup?.blur()
  }

  const handlePaste: NonNullable<InputGroupInputProps["onPaste"]> = (event) => {
    onPaste?.(event)

    if (!event.defaultPrevented) {
      inputGroup?.paste()
    }
  }

  const handlePointerDown: NonNullable<
    InputGroupInputProps["onPointerDown"]
  > = (event) => {
    onPointerDown?.(event)
    inputGroup?.press()
  }

  const handlePointerUp: NonNullable<InputGroupInputProps["onPointerUp"]> = (
    event
  ) => {
    onPointerUp?.(event)
    inputGroup?.release()
  }

  const handlePointerCancel: NonNullable<
    InputGroupInputProps["onPointerCancel"]
  > = (event) => {
    onPointerCancel?.(event)
    inputGroup?.release()
  }

  const handlePointerLeave: NonNullable<
    InputGroupInputProps["onPointerLeave"]
  > = (event) => {
    onPointerLeave?.(event)
    inputGroup?.release()
  }

  return (
    <Input
      {...props}
      animated={inputGroup ? false : animated}
      data-slot="input-group-control"
      className={cn(
        "order-2 h-8 flex-1 border-0 bg-transparent px-3 shadow-none focus-visible:border-transparent focus-visible:ring-0 aria-invalid:border-transparent aria-invalid:ring-0 disabled:bg-transparent disabled:opacity-100 dark:bg-transparent dark:disabled:bg-transparent dark:aria-invalid:border-transparent dark:aria-invalid:ring-0",
        className
      )}
      onBlur={handleBlur}
      onFocus={handleFocus}
      onPaste={handlePaste}
      onPointerCancel={handlePointerCancel}
      onPointerDown={handlePointerDown}
      onPointerLeave={handlePointerLeave}
      onPointerUp={handlePointerUp}
    />
  )
}

type InputGroupTextareaProps = React.ComponentProps<typeof Textarea>

function InputGroupTextarea({
  animated,
  className,
  onBlur,
  onFocus,
  onPaste,
  onPointerCancel,
  onPointerDown,
  onPointerLeave,
  onPointerUp,
  ...props
}: InputGroupTextareaProps) {
  const inputGroup = useContext(InputGroupAnimationContext)

  const handleFocus: NonNullable<InputGroupTextareaProps["onFocus"]> = (
    event
  ) => {
    onFocus?.(event)
    inputGroup?.focus()
  }

  const handleBlur: NonNullable<InputGroupTextareaProps["onBlur"]> = (
    event
  ) => {
    onBlur?.(event)
    inputGroup?.blur()
  }

  const handlePaste: NonNullable<InputGroupTextareaProps["onPaste"]> = (
    event
  ) => {
    onPaste?.(event)

    if (!event.defaultPrevented) {
      inputGroup?.paste()
    }
  }

  const handlePointerDown: NonNullable<
    InputGroupTextareaProps["onPointerDown"]
  > = (event) => {
    onPointerDown?.(event)
    inputGroup?.press()
  }

  const handlePointerUp: NonNullable<InputGroupTextareaProps["onPointerUp"]> = (
    event
  ) => {
    onPointerUp?.(event)
    inputGroup?.release()
  }

  const handlePointerCancel: NonNullable<
    InputGroupTextareaProps["onPointerCancel"]
  > = (event) => {
    onPointerCancel?.(event)
    inputGroup?.release()
  }

  const handlePointerLeave: NonNullable<
    InputGroupTextareaProps["onPointerLeave"]
  > = (event) => {
    onPointerLeave?.(event)
    inputGroup?.release()
  }

  return (
    <Textarea
      {...props}
      animated={inputGroup ? false : animated}
      data-slot="input-group-control"
      className={cn(
        "order-2 min-h-16 flex-1 resize-none border-0 bg-transparent px-3 py-2 shadow-none focus-visible:border-transparent focus-visible:ring-0 aria-invalid:border-transparent aria-invalid:ring-0 disabled:bg-transparent disabled:opacity-100 dark:bg-transparent dark:disabled:bg-transparent dark:aria-invalid:border-transparent dark:aria-invalid:ring-0",
        className
      )}
      onBlur={handleBlur}
      onFocus={handleFocus}
      onPaste={handlePaste}
      onPointerCancel={handlePointerCancel}
      onPointerDown={handlePointerDown}
      onPointerLeave={handlePointerLeave}
      onPointerUp={handlePointerUp}
    />
  )
}

type InputGroupAddonProps = React.ComponentProps<"div"> & {
  align?: "inline-start" | "inline-end" | "block-start" | "block-end"
}

function InputGroupAddon({
  align = "inline-start",
  className,
  ...props
}: InputGroupAddonProps) {
  return (
    <div
      data-align={align}
      data-slot="input-group-addon"
      className={cn(
        "flex h-8 shrink-0 select-none items-center gap-1.5 px-3 text-sm text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        align === "inline-start" && "order-1",
        align === "inline-end" && "order-3",
        align === "block-start" && "order-0 h-auto w-full border-b py-2",
        align === "block-end" && "order-4 h-auto w-full border-t py-2",
        className
      )}
      {...props}
    />
  )
}

type InputGroupButtonProps = React.ComponentProps<typeof Button>

function InputGroupButton({
  className,
  size = "xs",
  variant = "ghost",
  ...props
}: InputGroupButtonProps) {
  return (
    <Button
      data-slot="input-group-button"
      size={size}
      variant={variant}
      className={cn("h-7 shrink-0 rounded-sm px-2 text-xs", className)}
      {...props}
    />
  )
}

function InputGroupText({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="input-group-text"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

type InputGroupKbdProps = Omit<React.ComponentProps<"kbd">, keyof MotionProps> &
  MotionProps & {
    animated?: boolean
    shortcut?: string
  }

function InputGroupKbd({
  animated = true,
  className,
  shortcut,
  style,
  ...props
}: InputGroupKbdProps) {
  const controls = useAnimationControls()
  const reduceMotion = useReducedMotion()
  const isPressedRef = useRef(false)
  const pressedKeysRef = useRef(new Set<string>())

  const press = useCallback(() => {
    if (isPressedRef.current || !animated || reduceMotion) {
      return
    }

    isPressedRef.current = true
    void controls.start({
      scaleX: 1.08,
      scaleY: 0.88,
      y: 1,
      transition: { type: "spring", stiffness: 620, damping: 24, mass: 0.45 },
    })
  }, [animated, controls, reduceMotion])

  const release = useCallback(() => {
    if (!isPressedRef.current) {
      return
    }

    isPressedRef.current = false

    if (!animated || reduceMotion) {
      return
    }

    void controls.start({
      scaleX: [1.08, 0.96, 1.02, 1],
      scaleY: [0.88, 1.06, 0.98, 1],
      y: [1, 0, 0, 0],
      transition: {
        duration: 0.34,
        ease: [0.22, 1, 0.36, 1],
        times: [0, 0.35, 0.72, 1],
      },
    })
  }, [animated, controls, reduceMotion])

  useEffect(() => {
    if (!shortcut) {
      return
    }

    const requiredKeys = getShortcutKeys(shortcut)

    if (requiredKeys.length === 0) {
      return
    }

    const hasShortcut = () =>
      requiredKeys.every((key) => pressedKeysRef.current.has(key))

    const handleKeyDown = (event: KeyboardEvent) => {
      syncModifierKeys(event, pressedKeysRef.current)
      pressedKeysRef.current.add(normalizeShortcutKey(event.key))

      if (hasShortcut()) {
        press()
      }
    }

    const handleKeyUp = (event: KeyboardEvent) => {
      pressedKeysRef.current.delete(normalizeShortcutKey(event.key))
      syncModifierKeys(event, pressedKeysRef.current)

      if (!hasShortcut()) {
        release()
      }
    }

    const clearPressedKeys = () => {
      pressedKeysRef.current.clear()
      release()
    }

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)
    window.addEventListener("blur", clearPressedKeys)
    document.addEventListener("visibilitychange", clearPressedKeys)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
      window.removeEventListener("blur", clearPressedKeys)
      document.removeEventListener("visibilitychange", clearPressedKeys)
    }
  }, [press, release, shortcut])

  return (
    <MotionKbd
      animate={controls}
      data-shortcut={shortcut}
      data-slot="input-group-kbd"
      className={cn(
        "inline-flex h-5 min-w-5 items-center justify-center rounded border bg-muted px-1 font-mono text-[0.6875rem] font-medium text-muted-foreground shadow-[0_1px_0_rgb(0_0_0_/_0.35)] will-change-transform dark:shadow-[0_1px_0_rgb(255_255_255_/_0.12)]",
        className
      )}
      style={{ transformOrigin: "center", ...style }}
      {...props}
    />
  )
}

export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupKbd,
  InputGroupTextarea,
  InputGroupText,
}
