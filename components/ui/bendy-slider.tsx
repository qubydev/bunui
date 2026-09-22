"use client";

import * as React from "react";
import { motion } from "motion/react";
import { SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

export type BendySliderProps = Omit<
  React.ComponentProps<"div">,
  "defaultValue" | "onChange"
> & {
  /** Controlled value (between min and max). */
  value?: number;
  /** Uncontrolled default value. Defaults to the center ((min + max) / 2). */
  defaultValue?: number;
  /** Minimum slider value. Default: 0. */
  min?: number;
  /** Maximum slider value. Default: 100. */
  max?: number;
  /** Step increment. Default: 1. */
  step?: number;
  /** Called whenever the value changes. */
  onValueChange?: (value: number) => void;
  /** Called when the value change interaction commits (drag release or keyboard end). */
  onValueCommit?: (value: number) => void;
  /** Leading icon rendered on the left of the slider track. Defaults to SlidersHorizontal. */
  icon?: React.ReactNode;
  /** Custom formatter for the percentage/value on the right. Default: `${Math.round(percent)}%`. */
  formatValue?: (value: number) => React.ReactNode;
  /** Size variant. */
  size?: "sm" | "default" | "lg";
  /** Whether the slider is disabled. */
  disabled?: boolean;
  /** Maximum bend curvature in pixels at the capsule edges. */
  maxBend?: number;
  /** Optional custom class for the track. */
  trackClassName?: string;
  /** Optional custom class for the knob thumb. */
  thumbClassName?: string;
};

const SIZE_CONFIGS = {
  sm: {
    height: 32,
    heightClass: "h-8",
    knobHeight: 18,
    margin: 10,
    strokeWidth: 2.5,
    maxBend: 8,
    textSize: "text-[11px]",
    iconSize: "size-3.5",
    iconWidth: 14,
    textWidth: 26,
  },
  default: {
    height: 40,
    heightClass: "h-10",
    knobHeight: 24,
    margin: 12,
    strokeWidth: 3,
    maxBend: 10,
    textSize: "text-xs",
    iconSize: "size-4",
    iconWidth: 16,
    textWidth: 30,
  },
  lg: {
    height: 48,
    heightClass: "h-12",
    knobHeight: 30,
    margin: 14,
    strokeWidth: 3.5,
    maxBend: 12,
    textSize: "text-sm",
    iconSize: "size-4.5",
    iconWidth: 18,
    textWidth: 34,
  },
} as const;

export function BendySlider({
  value: controlledValue,
  defaultValue,
  min = 0,
  max = 100,
  step = 1,
  onValueChange,
  onValueCommit,
  icon,
  formatValue,
  size = "default",
  disabled = false,
  maxBend: userMaxBend,
  className,
  trackClassName,
  thumbClassName,
  ...props
}: BendySliderProps) {
  const isControlled = controlledValue !== undefined;
  const initialValue = defaultValue ?? (min + max) / 2;

  const [internalValue, setInternalValue] = React.useState(initialValue);
  const rawValue = isControlled ? controlledValue : internalValue;
  const value = Math.max(min, Math.min(max, rawValue));

  const [isDragging, setIsDragging] = React.useState(false);
  const [hasMounted, setHasMounted] = React.useState(false);
  const trackRef = React.useRef<HTMLDivElement>(null);
  const [trackWidth, setTrackWidth] = React.useState(280);

  const cfg = SIZE_CONFIGS[size] ?? SIZE_CONFIGS.default;
  const maxBend = userMaxBend ?? cfg.maxBend;

  // Track mount status to disable animations on initial load
  React.useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setHasMounted(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  // Track width measurement via ResizeObserver
  React.useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const updateWidth = () => {
      const rect = el.getBoundingClientRect();
      if (rect.width > 0) setTrackWidth(rect.width);
    };

    updateWidth();
    const observer = new ResizeObserver(updateWidth);
    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  const clampValue = React.useCallback(
    (val: number) => {
      const clamped = Math.max(min, Math.min(max, val));
      const stepsCount = Math.round((clamped - min) / step);
      const stepped = min + stepsCount * step;
      return Math.max(min, Math.min(max, Number(stepped.toFixed(6))));
    },
    [min, max, step],
  );

  const updateFromPointer = React.useCallback(
    (clientX: number) => {
      const track = trackRef.current;
      if (!track || disabled) return;

      const rect = track.getBoundingClientRect();
      const usableWidth = Math.max(1, rect.width - cfg.margin * 2);
      const relativeX = clientX - rect.left - cfg.margin;
      const ratio = Math.max(0, Math.min(1, relativeX / usableWidth));
      const nextVal = clampValue(min + ratio * (max - min));

      if (!isControlled) {
        setInternalValue(nextVal);
      }
      onValueChange?.(nextVal);
      return nextVal;
    },
    [cfg.margin, disabled, min, max, clampValue, isControlled, onValueChange],
  );

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (disabled || e.button !== 0) return;
    e.currentTarget.focus();
    setIsDragging(true);
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}
    updateFromPointer(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || disabled) return;
    updateFromPointer(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setIsDragging(false);
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {}
    }
    const finalVal = updateFromPointer(e.clientX);
    onValueCommit?.(finalVal ?? value);
  };

  const handlePointerCancel = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setIsDragging(false);
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {}
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;

    let nextValue: number | null = null;
    const onePercent = Math.max(step, (max - min) / 100);
    const largeStep = Math.max(step * 10, (max - min) / 10);

    switch (e.key) {
      case "ArrowRight":
      case "ArrowUp":
        nextValue = clampValue(value + onePercent);
        break;
      case "ArrowLeft":
      case "ArrowDown":
        nextValue = clampValue(value - onePercent);
        break;
      case "PageUp":
        nextValue = clampValue(value + largeStep);
        break;
      case "PageDown":
        nextValue = clampValue(value - largeStep);
        break;
      case "Home":
        nextValue = min;
        break;
      case "End":
        nextValue = max;
        break;
      default:
        return;
    }

    e.preventDefault();
    if (nextValue !== null && nextValue !== value) {
      if (!isControlled) {
        setInternalValue(nextValue);
      }
      onValueChange?.(nextValue);
      onValueCommit?.(nextValue);
    }
  };

  // Normalized progress: 0 to 1
  const ratio = max - min === 0 ? 0.5 : (value - min) / (max - min);
  const percent = Math.round(ratio * 100);

  // Knob travel position along the track
  const usableWidth = Math.max(1, trackWidth - cfg.margin * 2);
  const knobX = cfg.margin + ratio * usableWidth;

  // Knob vertical dimensions
  const trackHeight = cfg.height;
  const knobH = cfg.knobHeight;
  const yTop = (trackHeight - knobH) / 2;
  const yBottom = (trackHeight + knobH) / 2;
  const yMid = trackHeight / 2;

  // Bend calculation:
  // - 0% to 25%: linearly bends left (-maxBend at 0%, 0 at 25%)
  // - 25% to 75%: stays completely straight (bend = 0)
  // - 75% to 100%: linearly bends right (0 at 75%, +maxBend at 100%)
  let bend = 0;
  if (percent <= 25) {
    bend = ((percent - 25) / 25) * maxBend;
  } else if (percent >= 75) {
    bend = ((percent - 75) / 25) * maxBend;
  }

  // Simple clean quadratic curve between the two fixed endpoints
  const knobPathD = `M ${knobX.toFixed(2)} ${yTop.toFixed(2)} Q ${(knobX + bend).toFixed(2)} ${yMid.toFixed(2)} ${knobX.toFixed(2)} ${yBottom.toFixed(2)}`;

  // Default leading icon
  const leadingIcon =
    icon !== undefined ? (
      icon
    ) : (
      <SlidersHorizontal className={cfg.iconSize} />
    );

  // Display percentage / formatted value
  const displayedValue = formatValue ? formatValue(value) : `${percent}%`;

  // Squeeze / flip detection: only triggers when knob is genuinely close to colliding
  const gap = 6;
  const leftThreshold = cfg.margin + cfg.iconWidth + 4;
  const rightThreshold = trackWidth - cfg.margin - cfg.textWidth - 4;

  const iconFlipped = knobX < leftThreshold;
  const textFlipped = knobX > rightThreshold;

  // Target X coordinates for icon and text
  const iconX = iconFlipped ? knobX + gap : cfg.margin;
  const textX = textFlipped
    ? knobX - cfg.textWidth - gap
    : trackWidth - cfg.margin - cfg.textWidth;

  return (
    <div
      ref={trackRef}
      role="slider"
      tabIndex={disabled ? -1 : 0}
      aria-label={props["aria-label"] ?? "Bendy slider"}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      aria-valuetext={`${percent}%`}
      aria-disabled={disabled || undefined}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
      onLostPointerCapture={() => setIsDragging(false)}
      onKeyDown={handleKeyDown}
      data-slot="bendy-slider"
      data-dragging={isDragging || undefined}
      data-disabled={disabled || undefined}
      className={cn(
        "group relative flex w-full touch-none select-none items-center rounded-full border bg-gradient-to-r from-[#93c5fd] via-white to-[#f97316] outline-none",
        "text-stone-900 shadow-xs",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        cfg.heightClass,
        disabled && "pointer-events-none opacity-50",
        trackClassName,
        className,
      )}
      {...props}
    >
      {/* SVG Layer for bending knob arc */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 size-full"
      >
        <path
          d={knobPathD}
          fill="none"
          stroke="#3f1408"
          strokeWidth={cfg.strokeWidth}
          strokeLinecap="round"
          className={thumbClassName}
        />
      </svg>

      {/* Leading icon (left) - springs across knob when space runs out */}
      {leadingIcon && (
        <motion.div
          aria-hidden="true"
          initial={false}
          animate={{ x: iconX }}
          transition={
            hasMounted
              ? {
                  type: "spring",
                  stiffness: 420,
                  damping: 26,
                  mass: 0.8,
                }
              : { duration: 0 }
          }
          className="pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center text-stone-800/80"
          style={{ width: cfg.iconWidth }}
        >
          {leadingIcon}
        </motion.div>
      )}

      {/* Trailing percentage (right) - springs across knob when space runs out */}
      <motion.div
        aria-hidden="true"
        initial={false}
        animate={{ x: textX }}
        transition={
          hasMounted
            ? {
                type: "spring",
                stiffness: 420,
                damping: 26,
                mass: 0.8,
              }
            : { duration: 0 }
        }
        className={cn(
          "pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center font-semibold tabular-nums tracking-tight select-none text-stone-900",
          cfg.textSize,
        )}
        style={{ width: cfg.textWidth }}
      >
        {displayedValue}
      </motion.div>
    </div>
  );
}

export default BendySlider;
