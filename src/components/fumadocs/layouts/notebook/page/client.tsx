"use client";

import type {ComponentProps} from "react";
import {ChevronDown} from "@gravity-ui/icons";
import {useActiveAnchor} from "fumadocs-core/toc";
import {useTOCItems} from "fumadocs-ui/components/toc";
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "fumadocs-ui/components/ui/collapsible";
import {useTreePath} from "fumadocs-ui/contexts/tree";
import {createContext, use, useEffect, useEffectEvent, useMemo, useRef, useState} from "react";
import {cn} from "@/utils/cn";
import {LayoutContext} from "../client";

const TocPopoverContext = createContext<{open: boolean; setOpen: (open: boolean) => void} | null>(null);

export function PageTOCPopover({children, className, ...rest}: ComponentProps<"div">) {
  const ref = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const {isNavTransparent} = use(LayoutContext);
  const onClick = useEffectEvent((event: Event) => {
    if (open && ref.current && !ref.current.contains(event.target as HTMLElement)) setOpen(false);
  });

  useEffect(() => {
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, []);

  return (
    <TocPopoverContext value={useMemo(() => ({open, setOpen}), [open])}>
      <Collapsible
        data-toc-popover=""
        open={open}
        className={cn(
          "max-xl:layout:[--fd-toc-popover-height:--spacing(10)] sticky top-(--fd-docs-row-2) z-10 h-(--fd-toc-popover-height) [grid-area:toc-popover] xl:hidden",
          className,
        )}
        onOpenChange={setOpen}
        {...rest}
      >
        <header
          ref={ref}
          className={cn(
            "border-b backdrop-blur-sm transition-colors",
            (!isNavTransparent || open) && "bg-fd-background/80",
            open && "shadow-lg",
          )}
        >
          {children}
        </header>
      </Collapsible>
    </TocPopoverContext>
  );
}

export function PageTOCPopoverTrigger({className, ...props}: ComponentProps<"button">) {
  const {open} = use(TocPopoverContext)!;
  const items = useTOCItems();
  const active = useActiveAnchor();
  const selected = useMemo(() => items.findIndex((item) => active === item.url.slice(1)), [items, active]);
  const path = useTreePath().at(-1);
  const showItem = selected !== -1 && !open;

  return (
    <CollapsibleTrigger
      data-toc-popover-trigger=""
      className={cn(
        "text-fd-muted-foreground flex h-10 w-full items-center gap-2.5 px-4 py-2.5 text-start text-sm focus-visible:outline-none md:px-6 [&_svg]:size-4",
        className,
      )}
      {...props}
    >
      <ProgressCircle className={cn("shrink-0", open && "text-fd-primary")} max={1} value={(selected + 1) / Math.max(1, items.length)} />
      <span className="grid flex-1 *:col-start-1 *:row-start-1 *:my-auto">
        <span className={cn("truncate transition-all", open && "text-fd-foreground", showItem && "pointer-events-none -translate-y-full opacity-0")}>
          {path?.name ?? "On this page"}
        </span>
        <span className={cn("truncate transition-all", !showItem && "pointer-events-none translate-y-full opacity-0")}>
          {items[selected]?.title}
        </span>
      </span>
      <ChevronDown className={cn("mx-0.5 shrink-0 transition-transform", open && "rotate-180")} />
    </CollapsibleTrigger>
  );
}

interface ProgressCircleProps extends Omit<React.ComponentProps<"svg">, "strokeWidth"> {
  value: number;
  strokeWidth?: number;
  size?: number;
  min?: number;
  max?: number;
}

function ProgressCircle({max = 100, min = 0, size = 24, strokeWidth = 2, value, ...props}: ProgressCircleProps) {
  const normalized = Math.min(max, Math.max(min, value));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (normalized / max) * circumference;
  const circle = {cx: size / 2, cy: size / 2, fill: "none", r: radius, strokeWidth};

  return (
    <svg aria-valuemax={max} aria-valuemin={min} aria-valuenow={normalized} role="progressbar" viewBox={`0 0 ${size} ${size}`} {...props}>
      <circle {...circle} className="stroke-current/25" />
      <circle {...circle} className="transition-all" stroke="currentColor" strokeDasharray={circumference} strokeDashoffset={circumference - progress} strokeLinecap="round" transform={`rotate(-90 ${size / 2} ${size / 2})`} />
    </svg>
  );
}

export function PageTOCPopoverContent(props: ComponentProps<"div">) {
  return (
    <CollapsibleContent
      data-toc-popover-content=""
      {...props}
      className={cn("flex max-h-[50vh] flex-col px-4 md:px-6", props.className)}
    >
      {props.children}
    </CollapsibleContent>
  );
}