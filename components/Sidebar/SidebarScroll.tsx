"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export const SCROLL_FADE = 48;
export const SCROLL_SELECTOR = "[data-sidebar-scroll]";

const LAYERS = 4;

// stacked backdrop filters ramp the blur up toward the edge instead of banding
const blurLayers = (side: "top" | "bottom") =>
  Array.from({ length: LAYERS }, (_, index) => {
    const blur = 0.5 * 2 ** index;
    const end = (100 * (LAYERS - index)) / LAYERS;
    const mask = `linear-gradient(to ${
      side === "top" ? "bottom" : "top"
    }, var(--foreground) 0, var(--foreground) ${end / 2}%, transparent ${end}%)`;

    return { blur, mask };
  });

const TOP_LAYERS = blurLayers("top");
const BOTTOM_LAYERS = blurLayers("bottom");

const BlurEdge = ({
  side,
  visible,
}: {
  side: "top" | "bottom";
  visible: boolean;
}) => (
  <div
    aria-hidden
    style={{ opacity: visible ? 1 : 0 }}
    className={cn(
      "pointer-events-none absolute inset-x-0 h-12 transition-opacity duration-200 motion-reduce:transition-none",
      side === "top" ? "top-0" : "bottom-0",
    )}
  >
    {(side === "top" ? TOP_LAYERS : BOTTOM_LAYERS).map(({ blur, mask }) => (
      <div
        key={blur}
        style={{
          backdropFilter: `blur(calc(var(--spacing) * ${blur}))`,
          WebkitBackdropFilter: `blur(calc(var(--spacing) * ${blur}))`,
          maskImage: mask,
          WebkitMaskImage: mask,
        }}
        className="absolute inset-0"
      />
    ))}
  </div>
);

const SidebarScroll = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [fadeTop, setFadeTop] = useState(false);
  const [fadeBottom, setFadeBottom] = useState(false);

  useEffect(() => {
    const scroller = scrollRef.current;
    const content = contentRef.current;
    if (!scroller || !content) return;

    const update = () => {
      setFadeTop(scroller.scrollTop > 2);
      setFadeBottom(
        scroller.scrollTop + scroller.clientHeight < scroller.scrollHeight - 2,
      );
    };

    scroller.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(scroller);
    observer.observe(content);

    return () => {
      scroller.removeEventListener("scroll", update);
      observer.disconnect();
    };
  }, []);

  const mask = `linear-gradient(to bottom, transparent 0, var(--foreground) ${
    fadeTop ? "calc(var(--spacing) * 12)" : 0
  }, var(--foreground) calc(100% - ${
    fadeBottom ? "calc(var(--spacing) * 12)" : 0
  }), transparent 100%)`;

  return (
    <div className={cn("relative", className)}>
      <div
        ref={scrollRef}
        data-sidebar-scroll=""
        style={{ maskImage: mask, WebkitMaskImage: mask }}
        className="no-scrollbar h-full overflow-y-auto"
      >
        <div ref={contentRef}>{children}</div>
      </div>

      <BlurEdge side="top" visible={fadeTop} />
      <BlurEdge side="bottom" visible={fadeBottom} />
    </div>
  );
};

export default SidebarScroll;
