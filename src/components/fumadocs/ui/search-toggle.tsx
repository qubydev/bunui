"use client";

import type {ComponentProps} from "react";

import gsap from "gsap";
import {useEffect, useRef} from "react";
import {useI18n} from "fumadocs-ui/contexts/i18n";
import {useSearchContext} from "fumadocs-ui/contexts/search";

import {Button, type ButtonProps} from "@/registry/default/ui/button";
import {Search} from "@/components/fumadocs/ui/icons";
import {cn} from "@/utils/cn";

interface SearchToggleProps extends Omit<ButtonProps, "children"> {
  hideIfDisabled?: boolean;
}

export function SearchToggle({
  hideIfDisabled,
  size = "sm",
  variant = "ghost",
  ...props
}: SearchToggleProps) {
  const {enabled, setOpenSearch} = useSearchContext();

  if (hideIfDisabled && !enabled) return null;

  return (
    <Button
      aria-label="Open Search"
      data-search=""
      isIconOnly
      size={size}
      type="button"
      variant={variant}
      {...props}
      onClick={() => {
        setOpenSearch(true);
      }}
    >
      <Search className="size-4.5" />
    </Button>
  );
}

export function LargeSearchToggle({
  hideIfDisabled,
  ...props
}: ComponentProps<"button"> & {
  hideIfDisabled?: boolean;
}) {
  const {enabled, setOpenSearch} = useSearchContext();
  const {text} = useI18n();
  const commandKeyRef = useRef<HTMLElement>(null);
  const kKeyRef = useRef<HTMLElement>(null);
  const pressedKeysRef = useRef(new Set<string>());

  useEffect(() => {
    const squeeze = (element: HTMLElement | null) => {
      if (!element) return;

      gsap.killTweensOf(element);
      gsap.to(element, {
        duration: 0.12,
        ease: "power2.out",
        scaleX: 1.12,
        scaleY: 0.84,
        y: 1,
      });
    };

    const release = (element: HTMLElement | null) => {
      if (!element) return;

      gsap.killTweensOf(element);
      gsap.to(element, {
        duration: 0.34,
        ease: "elastic.out(1, 0.48)",
        scaleX: 1,
        scaleY: 1,
        y: 0,
      });
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      const pressKey = key === "meta" || key === "control" ? "command" : key === "k" ? "k" : null;

      if (!pressKey || pressedKeysRef.current.has(pressKey)) return;

      pressedKeysRef.current.add(pressKey);
      squeeze(pressKey === "command" ? commandKeyRef.current : kKeyRef.current);
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      const pressKey = key === "meta" || key === "control" ? "command" : key === "k" ? "k" : null;

      if (!pressKey) return;

      pressedKeysRef.current.delete(pressKey);
      release(pressKey === "command" ? commandKeyRef.current : kKeyRef.current);
    };

    const handleBlur = () => {
      pressedKeysRef.current.clear();
      release(commandKeyRef.current);
      release(kKeyRef.current);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("blur", handleBlur);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("blur", handleBlur);
      gsap.killTweensOf([commandKeyRef.current, kKeyRef.current]);
    };
  }, []);

  if (hideIfDisabled && !enabled) return null;

  return (
    <button
      data-search-full=""
      type="button"
      {...props}
      className={cn(
        "bg-fd-secondary/50 text-fd-muted-foreground hover:bg-fd-accent hover:text-fd-muted-foreground inline-flex items-center gap-2 rounded-lg border p-1.5 ps-2 text-sm transition-colors",
        props.className,
      )}
      onClick={() => {
        setOpenSearch(true);
      }}
    >
      <Search className="size-4" />
      {text.search}
      <div className="ms-auto inline-flex gap-0.5">
        <kbd ref={commandKeyRef} className="bg-fd-background inline-flex size-6 origin-center items-center justify-center rounded-md border">
          {"\u2318"}
        </kbd>
        <kbd ref={kKeyRef} className="bg-fd-background inline-flex size-6 origin-center items-center justify-center rounded-md border">
          K
        </kbd>
      </div>
    </button>
  );
}
