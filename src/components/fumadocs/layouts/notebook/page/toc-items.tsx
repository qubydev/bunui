"use client";

import type {TOCItemType} from "fumadocs-core/toc";
import type {ComponentProps} from "react";

import {useActiveAnchor} from "fumadocs-core/toc";
import {useTOCItems} from "fumadocs-ui/components/toc";

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

export function TOCItems({className, ...props}: TOCItemsProps) {
  const items = useTOCItems();
  const activeAnchor = useActiveAnchor();

  if (items.length === 0) return null;

  return (
    <div className="relative">
      <div
        className={cn(
          "border-fd-foreground/10 flex flex-col border-s",
          className,
        )}
        {...props}
      >
        {items.map((item) => {
          const active = activeAnchor === getItemId(item);

          return (
            <a
              key={item.url}
              href={item.url}
              aria-current={active ? "location" : undefined}
              className={cn(
                "relative -ms-px border-s border-transparent py-1.5 text-sm wrap-anywhere transition-colors first:pt-0 last:pb-0",
                "text-fd-muted-foreground hover:text-fd-accent-foreground",
                item.depth <= 2 && "ps-3",
                item.depth === 3 && "ps-6",
                item.depth >= 4 && "ps-8",
                active && "border-fd-primary text-fd-primary",
              )}
            >
              {item.title}
            </a>
          );
        })}
      </div>
    </div>
  );
}