"use client";

import type {ComponentProps} from "react";

import gsap from "gsap";
import {useTheme} from "next-themes";
import {useEffect, useRef} from "react";
import {tv} from "tailwind-variants";

import {Airplay, Moon, Sun} from "@/components/fumadocs/ui/icons";
import {useIsMounted} from "@/hooks/use-is-mounted";
import {cn} from "@/utils/cn";

const itemVariants = tv({
  base: "relative z-1 flex size-6.5 items-center justify-center rounded-full p-1.5 transition-colors",
  variants: {
    active: {
      false: "text-fd-muted-foreground",
      true: "text-fd-accent-foreground",
    },
  },
});

const full = [["light", Sun] as const, ["dark", Moon] as const, ["system", Airplay] as const];

export function ThemeToggle({
  className,
  mode = "light-dark",
  ...props
}: ComponentProps<"div"> & {
  mode?: "light-dark" | "light-dark-system";
}) {
  const {resolvedTheme, setTheme, theme} = useTheme();
  const mounted = useIsMounted();
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLSpanElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const itemRefs = useRef(new Map<string, HTMLButtonElement>());
  const iconRefs = useRef(new Map<string, SVGSVGElement>());
  const hasSyncedIndicatorRef = useRef(false);
  const valueRef = useRef<string | null | undefined>(null);

  const container = cn(
    "relative inline-flex cursor-(--cursor-interactive) items-center rounded-full border p-1",
    className,
  );

  const value = mounted ? (mode === "light-dark" ? resolvedTheme : theme) : null;
  const items = mode === "light-dark" ? full.filter(([key]) => key !== "system") : full;
  valueRef.current = value;

  useEffect(() => {
    if (!value) {
      return;
    }

    const track = trackRef.current;
    const indicator = indicatorRef.current;
    const activeItem = itemRefs.current.get(value);

    if (!track || !indicator || !activeItem) {
      return;
    }

    const x = activeItem.offsetLeft - track.offsetLeft;
    const width = activeItem.offsetWidth;
    const height = activeItem.offsetHeight;

    const target = {
      height,
      width,
      x,
    };

    if (!hasSyncedIndicatorRef.current) {
      gsap.set(indicator, target);
      hasSyncedIndicatorRef.current = true;
      return;
    }

    gsap.to(indicator, {
      duration: 0.42,
      ease: "elastic.out(1, 0.6)",
      overwrite: "auto",
      ...target,
    });
  }, [value, mode]);

  useEffect(() => {
    const syncIndicator = () => {
      const currentValue = valueRef.current;

      if (!currentValue) {
        return;
      }

      const indicator = indicatorRef.current;
      const track = trackRef.current;
      const activeItem = itemRefs.current.get(currentValue);

      if (!indicator || !track || !activeItem) {
        return;
      }

      gsap.set(indicator, {
        height: activeItem.offsetHeight,
        width: activeItem.offsetWidth,
        x: activeItem.offsetLeft - track.offsetLeft,
      });
    };

    syncIndicator();
    window.addEventListener("resize", syncIndicator);

    return () => {
      window.removeEventListener("resize", syncIndicator);
    };
  }, []);

  const popIcon = (key: string) => {
    const icon = iconRefs.current.get(key);

    if (!icon) {
      return;
    }

    gsap
      .timeline()
      .to(icon, {
        duration: 0.12,
        ease: "power2.out",
        overwrite: "auto",
        scale: 1.35,
        transformOrigin: "50% 50%",
      })
      .to(icon, {
        duration: 0.38,
        ease: "elastic.out(1, 0.45)",
        scale: 1,
        transformOrigin: "50% 50%",
      });
  };

  return (
    <div ref={containerRef} className={container} data-theme-toggle="" {...props}>
      <span ref={trackRef} aria-hidden="true" className="pointer-events-none absolute inset-1 z-0 overflow-hidden rounded-full">
        <span
          ref={indicatorRef}
          className="absolute top-0 left-0 rounded-full bg-fd-accent"
        />
      </span>
      {items.map(([key, Icon]) => (
        <button
          key={key}
          aria-label={key}
          className={cn(itemVariants({active: value === key}))}
          ref={(node) => {
            if (node) {
              itemRefs.current.set(key, node);
            } else {
              itemRefs.current.delete(key);
            }
          }}
          type="button"
          onClick={() => {
            popIcon(key);
            setTheme(key);
          }}
        >
          <Icon
            ref={(node) => {
              if (node) {
                iconRefs.current.set(key, node);
              } else {
                iconRefs.current.delete(key);
              }
            }}
            className="size-full"
            fill="currentColor"
          />
        </button>
      ))}
    </div>
  );
}
