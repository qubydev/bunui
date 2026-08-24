"use client";

import type {TOCItemType} from "fumadocs-core/toc";
import type {ComponentProps} from "react";

import {useActiveAnchor} from "fumadocs-core/toc";
import {useTOCItems} from "fumadocs-ui/components/toc";
import {useLayoutEffect, useRef, useState} from "react";

import {cn} from "@/utils/cn";

function getItemId(item: TOCItemType) {
  const raw = item.url.startsWith("#") ? item.url.slice(1) : item.url;
  try {
    return decodeURIComponent(raw);
  } catch {
    return raw;
  }
}

export type TOCItemsProps = ComponentProps<"div">;

type IndicatorPosition = {
  top: number;
  height: number;
};

export function TOCItems({className, ...props}: TOCItemsProps) {
  const items = useTOCItems();
  const activeAnchor = useActiveAnchor();
  const containerRef = useRef<HTMLDivElement>(null);
  const [indicator, setIndicator] = useState<IndicatorPosition | null>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container || !activeAnchor) return;

    const activeItem = Array.from(container.querySelectorAll<HTMLAnchorElement>("a[data-toc-item]"))
      .find((element) => element.dataset.tocId === activeAnchor);

    if (!activeItem) return;

    setIndicator({
      top: activeItem.offsetTop,
      height: activeItem.offsetHeight,
    });
  }, [activeAnchor, items]);

  if (items.length === 0) return null;

  return (
    <div
      ref={containerRef}
      className={cn("border-separator relative flex flex-col border-s", className)}
      {...props}
    >
      {indicator ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -start-px transition-[top,height] duration-200 ease-out motion-reduce:transition-none"
          style={{
            top: indicator.top,
            height: indicator.height,
            borderInlineStart: "1px solid var(--foreground)",
          }}
        />
      ) : null}

      {items.map((item) => {
        const id = getItemId(item);
        const active = activeAnchor === id;

        return (
          <a
            key={item.url}
            href={item.url}
            data-toc-item
            data-toc-id={id}
            aria-current={active ? "location" : undefined}
            className={cn(
              "relative -ms-px border-s py-1.5 text-sm wrap-anywhere transition-colors first:pt-0 last:pb-0",
              "text-fd-muted-foreground hover:text-fd-accent-foreground",
              item.depth <= 2 && "ps-3",
              item.depth === 3 && "ps-6",
              item.depth >= 4 && "ps-8",
              active && "text-foreground",
            )}
            style={{
              borderInlineStartColor:
                active && !indicator ? "var(--foreground)" : "transparent",
            }}
          >
            {item.title}
          </a>
        );
      })}
    </div>
  );
}
