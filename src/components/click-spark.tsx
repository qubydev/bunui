"use client";

import {useCallback, useEffect, useRef, type ReactNode} from "react";

interface ClickSparkProps {
  sparkColor?: string;
  sparkSize?: number;
  sparkRadius?: number;
  sparkCount?: number;
  sparkOpacity?: number;
  duration?: number;
  easing?: "linear" | "ease-in" | "ease-out" | "ease-in-out";
  extraScale?: number;
  children?: ReactNode;
}

interface Spark {
  x: number;
  y: number;
  angle: number;
  startTime: number;
}

function resolveCanvasColor(color: string) {
  const variableMatch = color.match(/^var\((--[^),\s]+)\)$/);
  if (!variableMatch) {
    return color;
  }

  return getComputedStyle(document.documentElement).getPropertyValue(variableMatch[1]).trim() || color;
}

export function ClickSpark({
  sparkColor = "var(--foreground)",
  sparkSize = 10,
  sparkRadius = 15,
  sparkCount = 8,
  sparkOpacity = 0.7,
  duration = 400,
  easing = "ease-out",
  extraScale = 1,
  children,
}: ClickSparkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparksRef = useRef<Spark[]>([]);
  const startTimeRef = useRef<number | null>(null);

  const addSpark = useCallback(
    (x: number, y: number) => {
      const now = performance.now();

      const newSparks: Spark[] = Array.from({length: sparkCount}, (_, i) => ({
        x,
        y,
        angle: (2 * Math.PI * i) / sparkCount,
        startTime: now,
      }));

      sparksRef.current.push(...newSparks);
    },
    [sparkCount]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const resizeCanvas = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      addSpark(event.clientX, event.clientY);
    };

    window.addEventListener("pointerdown", handlePointerDown, {capture: true});

    return () => {
      window.removeEventListener("pointerdown", handlePointerDown, {capture: true});
    };
  }, [addSpark]);

  const easeFunc = useCallback(
    (t: number) => {
      switch (easing) {
        case "linear":
          return t;
        case "ease-in":
          return t * t;
        case "ease-in-out":
          return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        default:
          return t * (2 - t);
      }
    },
    [easing]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    let animationId: number;

    const draw = (timestamp: number) => {
      const resolvedSparkColor = resolveCanvasColor(sparkColor);

      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      sparksRef.current = sparksRef.current.filter((spark) => {
        const elapsed = timestamp - spark.startTime;
        if (elapsed >= duration) {
          return false;
        }

        const progress = elapsed / duration;
        const eased = easeFunc(progress);

        const upwardBias = 1 - Math.sin(spark.angle) * 0.35;
        const distance = eased * sparkRadius * extraScale * upwardBias;
        const lineLength = sparkSize * (1 - eased) * upwardBias;

        const x1 = spark.x + distance * Math.cos(spark.angle);
        const y1 = spark.y + distance * Math.sin(spark.angle);
        const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle);
        const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle);

        ctx.globalAlpha = sparkOpacity;
        ctx.strokeStyle = resolvedSparkColor;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.globalAlpha = 1;

        return true;
      });

      animationId = requestAnimationFrame(draw);
    };

    animationId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [sparkColor, sparkSize, sparkRadius, sparkOpacity, duration, easeFunc, extraScale]);

  return (
    <div className="relative flex min-h-screen flex-col">
      <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-[9999]" />
      {children}
    </div>
  );
}
