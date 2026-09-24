"use client";

import * as React from "react";
import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, type HTMLMotionProps } from "motion/react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import "@fontsource/chakra-petch/600.css";
import "@fontsource/chakra-petch/700.css";

export type RecorderState = "idle" | "recording" | "done";

export type PixelGridPattern = readonly (readonly (number | boolean)[])[];

export const RECORDER_GRID_PATTERNS = {
  /** All outer edges lit with center dot lit (idle icon) */
  edges: [
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1],
  ],
  /** Play triangle pattern */
  play: [
    [0, 1, 0, 0, 0],
    [0, 1, 1, 0, 0],
    [0, 1, 1, 1, 0],
    [0, 1, 1, 0, 0],
    [0, 1, 0, 0, 0],
  ],
  /** Pause two-bar pattern */
  pause: [
    [0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0],
  ],
  /** Countdown number 3 */
  digit3: [
    [1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1],
    [0, 1, 1, 1, 1],
    [0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1],
  ],
  /** Countdown number 2 */
  digit2: [
    [1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1],
  ],
  /** Countdown number 1: flat top then straight down, flat base, no angle */
  digit1: [
    [0, 1, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 1, 1, 1, 0],
  ],
  /** Confirm pattern on hover: all outer edge boxes lit */
  allEdges: [
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1],
  ],
  /** Cancel cross (X) mark pattern */
  cross: [
    [1, 0, 0, 0, 1],
    [0, 1, 0, 1, 0],
    [0, 0, 1, 0, 0],
    [0, 1, 0, 1, 0],
    [1, 0, 0, 0, 1],
  ],
  /** Circular ring with center dot */
  circle: [
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
  ],
  /** Center dot only */
  center: [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ],
  /** Fully lit 5x5 grid */
  filled: [
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
  ],
} as const;

/**
 * Generates diagonal moving zebra cross stripes
 * propagating from bottom-left [r=4, c=0] to top-right [r=0, c=4]
 */
function getDiagonalZebraPattern(phase: number): PixelGridPattern {
  const pattern: (number | boolean)[][] = Array.from({ length: 5 }, () =>
    Array(5).fill(0),
  );

  for (let r = 0; r < 5; r++) {
    for (let c = 0; c < 5; c++) {
      const dist = 4 - r + c;
      const wave = Math.sin(dist * 1.35 - phase);
      pattern[r][c] = wave > 0 ? 1 : 0;
    }
  }

  return pattern;
}

export type PixelGridProps = React.ComponentProps<"div"> & {
  /** 5x5 matrix indicating lit (1/true) and unlit (0/false) cells */
  pattern?: PixelGridPattern;
  /** Custom class for lit/active cells. Defaults to red with subtle glow. */
  activeColor?: string;
  /** Custom class for unlit/inactive cells. Defaults to dim red. */
  inactiveColor?: string;
  /** Width/height of each cell in pixels. Defaults to 3.5. */
  cellSize?: number;
  /** Gap between cells in pixels. Defaults to 1.5. */
  gap?: number;
};

export function PixelGrid({
  pattern = RECORDER_GRID_PATTERNS.edges,
  activeColor = "bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.4)]",
  inactiveColor = "bg-red-500/15 dark:bg-red-500/20",
  cellSize = 3.5,
  gap = 1.5,
  className,
  style,
  ...props
}: PixelGridProps) {
  const totalSize = 5 * cellSize + 4 * gap;

  return (
    <div
      role="img"
      aria-label="Recorder icon grid"
      className={cn("grid shrink-0 select-none", className)}
      style={{
        width: `${totalSize}px`,
        height: `${totalSize}px`,
        gridTemplateColumns: `repeat(5, ${cellSize}px)`,
        gridTemplateRows: `repeat(5, ${cellSize}px)`,
        gap: `${gap}px`,
        ...style,
      }}
      {...props}
    >
      {pattern.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          const isLit = Boolean(cell);
          return (
            <span
              key={`${rowIndex}-${colIndex}`}
              className={cn(
                "shrink-0 rounded-[1px] transition-colors duration-100",
                isLit ? activeColor : inactiveColor,
              )}
              style={{
                width: `${cellSize}px`,
                height: `${cellSize}px`,
              }}
            />
          );
        }),
      )}
    </div>
  );
}

export const RecordGrid = PixelGrid;

export type RecorderProps = Omit<HTMLMotionProps<"div">, "onChange" | "children"> & {
  /** Controlled state of the recorder. */
  state?: RecorderState;
  /** Initial uncontrolled state. Defaults to "idle". */
  defaultState?: RecorderState;
  /** Callback fired when the state changes. */
  onStateChange?: (state: RecorderState) => void;
  /** Callback fired when recording starts. */
  onStart?: () => void;
  /** Callback fired when recording finishes. Passes recorded duration in seconds. */
  onStop?: (duration: number) => void;
  /** Callback fired when recording is cancelled. */
  onCancel?: () => void;
  /** Callback fired when reset to idle. */
  onReset?: () => void;
  /** Callback fired when playback starts or resumes in done state. */
  onPlay?: () => void;
  /** Callback fired when playback is paused in done state. */
  onPause?: () => void;
  /** Custom icon for the idle record button. Defaults to the 5x5 PixelGrid. */
  icon?: React.ReactNode;
  /** 5x5 pattern for the default record grid icon. */
  gridPattern?: PixelGridPattern;
  /** Whether to show 3, 2, 1 countdown before recording starts. Defaults to true. */
  countdown?: boolean;
  /** Milliseconds per countdown number. Defaults to 750ms. */
  countdownDuration?: number;
  /** Maximum recording duration in seconds. Auto-stops when reached. */
  maxDuration?: number;
  /** Size variant of the component. */
  size?: "sm" | "default" | "lg";
  /** Whether the recorder is disabled. */
  disabled?: boolean;
  /** Custom formatter for time in seconds. Defaults to MM:SS format. */
  formatTime?: (seconds: number) => string;
};

function defaultFormatTime(totalSeconds: number): string {
  const rounded = Math.floor(Math.max(0, totalSeconds));
  const mins = Math.floor(rounded / 60);
  const secs = rounded % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

const TARGET_WIDTHS = {
  sm: {
    idle: 36,
    recording: 156,
    done: 156,
  },
  default: {
    idle: 44,
    recording: 184,
    done: 184,
  },
  lg: {
    idle: 52,
    recording: 220,
    done: 220,
  },
} as const;

const SIZE_CONFIGS = {
  sm: {
    containerHeight: "h-9",
    iconSize: "size-3.5",
    crossIconSize: "size-5",
    crossStrokeWidth: 2.6,
    actionButton: "size-7",
    timerClass: "text-base font-bold tracking-wider",
    radius: "rounded-lg",
    innerRadius: "rounded-md",
    gridCellSize: 2.5,
    gridGap: 1.5,
  },
  default: {
    containerHeight: "h-11",
    iconSize: "size-4",
    crossIconSize: "size-6",
    crossStrokeWidth: 2.8,
    actionButton: "size-8",
    timerClass: "text-xl font-bold tracking-wider",
    radius: "rounded-xl",
    innerRadius: "rounded-lg",
    gridCellSize: 3.5,
    gridGap: 1.5,
  },
  lg: {
    containerHeight: "h-13",
    iconSize: "size-5",
    crossIconSize: "size-7",
    crossStrokeWidth: 3.0,
    actionButton: "size-9.5",
    timerClass: "text-2xl font-bold tracking-wider",
    radius: "rounded-2xl",
    innerRadius: "rounded-xl",
    gridCellSize: 4.5,
    gridGap: 2,
  },
} as const;

export function Recorder({
  state: controlledState,
  defaultState = "idle",
  onStateChange,
  onStart,
  onStop,
  onCancel,
  onReset,
  onPlay,
  onPause,
  icon,
  gridPattern,
  countdown: enableCountdown = true,
  countdownDuration = 750,
  maxDuration,
  size = "default",
  disabled = false,
  formatTime = defaultFormatTime,
  className,
  style,
  ...props
}: RecorderProps) {
  const isControlled = controlledState !== undefined;
  const [internalState, setInternalState] = useState<RecorderState>(defaultState);
  const currentState = isControlled ? controlledState : internalState;

  const setState = useCallback(
    (nextState: RecorderState) => {
      if (!isControlled) {
        setInternalState(nextState);
      }
      onStateChange?.(nextState);
    },
    [isControlled, onStateChange],
  );

  const [duration, setDuration] = useState(0);
  const [playbackTime, setPlaybackTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLeftHovered, setIsLeftHovered] = useState(false);
  const [wavePhase, setWavePhase] = useState(0);
  const [countdown, setCountdown] = useState<number | null>(null);

  const timerRef = useRef<number | null>(null);
  const playTimerRef = useRef<number | null>(null);
  const countdownTimeoutsRef = useRef<number[]>([]);
  const startTimeRef = useRef<number>(0);
  const playStartTimeRef = useRef<number>(0);

  const config = SIZE_CONFIGS[size];
  const targetWidth = TARGET_WIDTHS[size][currentState];

  // Animate diagonal zebra wave while recording
  useEffect(() => {
    const isWaving = currentState === "recording" && countdown === null;

    if (!isWaving) return;

    const interval = window.setInterval(() => {
      setWavePhase((p) => p + 0.2);
    }, 45);
    return () => window.clearInterval(interval);
  }, [currentState, countdown]);

  // Clear timers on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
      if (playTimerRef.current) window.clearInterval(playTimerRef.current);
      countdownTimeoutsRef.current.forEach((t) => window.clearTimeout(t));
    };
  }, []);

  // Stop recording -> switch to confirmed "done" mode
  const handleStopRecording = useCallback(() => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
    const finalDuration = duration || 1;
    setIsLeftHovered(false);
    setCountdown(null);
    setIsPlaying(false);
    setPlaybackTime(0);
    setState("done");
    onStop?.(finalDuration);
  }, [duration, onStop, setState]);

  // Start actual recording timer after countdown
  const startRecordingTimer = useCallback(() => {
    setCountdown(null);
    setDuration(0);
    setPlaybackTime(0);
    setIsPlaying(false);
    setIsLeftHovered(false);
    setWavePhase(0);
    startTimeRef.current = Date.now();
    onStart?.();

    timerRef.current = window.setInterval(() => {
      const elapsed = (Date.now() - startTimeRef.current) / 1000;
      setDuration(elapsed);

      if (maxDuration && elapsed >= maxDuration) {
        handleStopRecording();
      }
    }, 100);
  }, [handleStopRecording, maxDuration, onStart]);

  // Click record in idle: immediately expands card and starts countdown
  const handleStartRecording = useCallback(() => {
    if (disabled) return;

    setState("recording");
    setDuration(0);
    setPlaybackTime(0);
    setIsPlaying(false);
    setIsLeftHovered(false);

    if (!enableCountdown) {
      startRecordingTimer();
      return;
    }

    countdownTimeoutsRef.current.forEach((t) => window.clearTimeout(t));
    countdownTimeoutsRef.current = [];

    setCountdown(3);

    const t2 = window.setTimeout(() => {
      setCountdown(2);
    }, countdownDuration);

    const t1 = window.setTimeout(() => {
      setCountdown(1);
    }, countdownDuration * 2);

    const t0 = window.setTimeout(() => {
      startRecordingTimer();
    }, countdownDuration * 3);

    countdownTimeoutsRef.current = [t2, t1, t0];
  }, [countdownDuration, disabled, enableCountdown, setState, startRecordingTimer]);

  // Cancel recording or countdown: resets and collapses back to idle
  const handleCancelRecording = useCallback(() => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
    countdownTimeoutsRef.current.forEach((t) => window.clearTimeout(t));
    countdownTimeoutsRef.current = [];
    setCountdown(null);
    setDuration(0);
    setPlaybackTime(0);
    setIsPlaying(false);
    setIsLeftHovered(false);
    setState("idle");
    onCancel?.();
  }, [onCancel, setState]);

  // Reset from done to idle
  const handleReset = useCallback(() => {
    if (playTimerRef.current) {
      window.clearInterval(playTimerRef.current);
      playTimerRef.current = null;
    }
    countdownTimeoutsRef.current.forEach((t) => window.clearTimeout(t));
    countdownTimeoutsRef.current = [];
    setCountdown(null);
    setDuration(0);
    setPlaybackTime(0);
    setIsPlaying(false);
    setIsLeftHovered(false);
    setState("idle");
    onReset?.();
  }, [onReset, setState]);

  // Play / Pause in done state
  const handleTogglePlay = useCallback(() => {
    if (isPlaying) {
      if (playTimerRef.current) {
        window.clearInterval(playTimerRef.current);
        playTimerRef.current = null;
      }
      setIsPlaying(false);
      onPause?.();
    } else {
      setIsPlaying(true);
      onPlay?.();
      const total = duration || 1;
      const startFrom = playbackTime >= total ? 0 : playbackTime;
      playStartTimeRef.current = Date.now() - startFrom * 1000;

      if (playTimerRef.current) {
        window.clearInterval(playTimerRef.current);
      }

      playTimerRef.current = window.setInterval(() => {
        const elapsed = (Date.now() - playStartTimeRef.current) / 1000;
        if (elapsed >= total) {
          if (playTimerRef.current) {
            window.clearInterval(playTimerRef.current);
            playTimerRef.current = null;
          }
          setPlaybackTime(0);
          setIsPlaying(false);
          onPause?.();
        } else {
          setPlaybackTime(elapsed);
        }
      }, 50);
    }
  }, [duration, isPlaying, onPause, onPlay, playbackTime]);

  // Determine left grid pattern while recording
  let recordingLeftGridPattern: PixelGridPattern = getDiagonalZebraPattern(wavePhase);
  if (countdown === 3) recordingLeftGridPattern = RECORDER_GRID_PATTERNS.digit3;
  else if (countdown === 2) recordingLeftGridPattern = RECORDER_GRID_PATTERNS.digit2;
  else if (countdown === 1) recordingLeftGridPattern = RECORDER_GRID_PATTERNS.digit1;
  else if (isLeftHovered) recordingLeftGridPattern = RECORDER_GRID_PATTERNS.allEdges;

  // Determine left grid pattern in confirmed done mode: play icon when paused, pause icon when playing
  const doneLeftGridPattern: PixelGridPattern = isPlaying
    ? RECORDER_GRID_PATTERNS.pause
    : RECORDER_GRID_PATTERNS.play;

  return (
    <motion.div
      animate={{ width: targetWidth }}
      transition={{ type: "spring", stiffness: 450, damping: 32 }}
      data-slot="recorder"
      data-state={currentState}
      data-disabled={disabled || undefined}
      className={cn(
        "relative inline-flex items-center overflow-hidden border border-border bg-card text-card-foreground shadow-xs backdrop-blur-md",
        config.containerHeight,
        config.radius,
        className,
      )}
      style={{
        ...style,
        width: targetWidth,
      }}
      {...props}
    >
      <AnimatePresence mode="wait" initial={false}>
        {/* 1. IDLE STATE */}
        {currentState === "idle" && (
          <motion.div
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.12 }}
            className="flex w-full h-full items-center justify-center shrink-0"
          >
            <button
              type="button"
              disabled={disabled}
              onClick={handleStartRecording}
              aria-label="Start recording"
              className="relative flex items-center justify-center p-1.5 text-foreground transition-transform cursor-pointer active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring bg-transparent hover:bg-transparent disabled:pointer-events-none disabled:opacity-50"
            >
              {icon ? (
                icon
              ) : (
                <PixelGrid
                  pattern={gridPattern ?? RECORDER_GRID_PATTERNS.edges}
                  cellSize={config.gridCellSize}
                  gap={config.gridGap}
                  className="transition-transform duration-150 ease-out"
                />
              )}
            </button>
          </motion.div>
        )}

        {/* 2. RECORDING / COUNTDOWN STATE */}
        {currentState === "recording" && (
          <motion.div
            key="recording"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.12 }}
            className="flex w-full h-full items-center justify-between px-2 shrink-0 whitespace-nowrap"
          >
            {/* Left Grid Button: Shows 3 -> 2 -> 1, then zebra wave, or all-edges on hover */}
            <button
              type="button"
              onClick={countdown === null ? handleStopRecording : undefined}
              onMouseEnter={() => {
                if (countdown === null) setIsLeftHovered(true);
              }}
              onMouseLeave={() => setIsLeftHovered(false)}
              aria-label={countdown !== null ? `Counting down ${countdown}` : "Confirm recording"}
              title={countdown !== null ? `Starting in ${countdown}...` : "Confirm recording"}
              className={cn(
                "relative flex shrink-0 items-center justify-center p-1.5 transition-transform bg-transparent hover:bg-transparent",
                countdown === null ? "cursor-pointer active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" : "cursor-default",
              )}
            >
              <PixelGrid
                pattern={recordingLeftGridPattern}
                activeColor={
                  countdown !== null || isLeftHovered
                    ? "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.7)]"
                    : "bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.4)]"
                }
                cellSize={config.gridCellSize}
                gap={config.gridGap}
                className="transition-transform duration-100 ease-out"
              />
            </button>

            {/* Center Timer Number */}
            <div className="flex shrink-0 items-center justify-center px-1">
              <span
                style={{ fontFamily: "'Chakra Petch', monospace" }}
                className={cn(
                  "tabular-nums text-foreground select-none leading-none",
                  config.timerClass,
                )}
              >
                {formatTime(duration)}
              </span>
            </div>

            {/* Right Cross Cancel Button: Always visible and can cancel at any time, even during countdown */}
            <button
              type="button"
              onClick={handleCancelRecording}
              aria-label="Cancel recording"
              title="Cancel recording"
              className={cn(
                "relative flex shrink-0 items-center justify-center text-muted-foreground transition-all cursor-pointer hover:text-foreground active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring bg-transparent hover:bg-transparent",
                config.actionButton,
                config.innerRadius,
              )}
            >
              <X
                className={config.crossIconSize}
                strokeWidth={config.crossStrokeWidth}
                aria-hidden="true"
              />
            </button>
          </motion.div>
        )}

        {/* 3. CONFIRMED / PLAYBACK STATE */}
        {currentState === "done" && (
          <motion.div
            key="done"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.12 }}
            className="flex w-full h-full items-center justify-between px-2 shrink-0 whitespace-nowrap"
          >
            {/* Left Grid Button: Play pattern -> when playing: wave animation -> on hover: pause pattern */}
            <button
              type="button"
              onClick={handleTogglePlay}
              onMouseEnter={() => setIsLeftHovered(true)}
              onMouseLeave={() => setIsLeftHovered(false)}
              aria-label={isPlaying ? "Pause playback" : "Play recording"}
              title={isPlaying ? "Pause" : "Play"}
              className="relative flex shrink-0 items-center justify-center p-1.5 transition-transform cursor-pointer active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring bg-transparent hover:bg-transparent"
            >
              <PixelGrid
                pattern={doneLeftGridPattern}
                activeColor={
                  isPlaying || isLeftHovered
                    ? "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.7)]"
                    : "bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.4)]"
                }
                cellSize={config.gridCellSize}
                gap={config.gridGap}
                className="transition-transform duration-100 ease-out"
              />
            </button>

            {/* Center Area: Playback Timer Number */}
            <div className="flex shrink-0 items-center justify-center px-1">
              <span
                style={{ fontFamily: "'Chakra Petch', monospace" }}
                className={cn(
                  "tabular-nums text-foreground select-none leading-none",
                  config.timerClass,
                )}
              >
                {formatTime(playbackTime > 0 ? playbackTime : duration)}
              </span>
            </div>

            {/* Right Cross Reset/Close Button: Same cross icon as recording mode */}
            <button
              type="button"
              onClick={handleReset}
              aria-label="Reset and close"
              title="Reset and close"
              className={cn(
                "relative flex shrink-0 items-center justify-center text-muted-foreground transition-all cursor-pointer hover:text-foreground active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring bg-transparent hover:bg-transparent",
                config.actionButton,
                config.innerRadius,
              )}
            >
              <X
                className={config.crossIconSize}
                strokeWidth={config.crossStrokeWidth}
                aria-hidden="true"
              />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default Recorder;
