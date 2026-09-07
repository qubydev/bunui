"use client";

import { useState } from "react";
import Link from "next/link";
import type { ComponentItem } from "@/lib/components";
import { cn } from "@/lib/utils";
import PreviewFallback from "./PreviewFallback";
import PreviewVideo from "./PreviewVideo";

export default function ComponentCard({
  item,
  large = false,
  autoPlay = false,
  className,
}: {
  item: ComponentItem;
  large?: boolean;
  autoPlay?: boolean;
  className?: string;
}) {
  const [active, setActive] = useState(false);

  return (
    <Link
      href={item.href}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
      className={cn(
        "group flex flex-col rounded-4xl border bg-muted p-2 transition-colors duration-200 ease-out dark:border-transparent dark:border-apple dark:bg-card dark:hover:bg-muted",
        large && "lg:h-full",
        className,
      )}
      style={{ cornerShape: "squircle" } as React.CSSProperties}
    >
      <div
        className={cn(
          "relative aspect-4/3 w-full overflow-hidden rounded-3xl border bg-popover dark:bg-muted",
          large && "lg:aspect-auto lg:flex-1",
        )}
        style={{ cornerShape: "squircle" } as React.CSSProperties}
      >
        {item.preview ? (
          <PreviewVideo
            src={item.preview}
            playing={active}
            autoPlay={autoPlay}
          />
        ) : (
          <PreviewFallback />
        )}
      </div>

      <div className="px-3 pb-1 pt-2">
        <h3 className="font-runde text-base font-semibold tracking-tight">
          {item.name}
        </h3>
      </div>
    </Link>
  );
}
