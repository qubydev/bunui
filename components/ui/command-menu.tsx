"use client";

import * as React from "react";
import { motion } from "motion/react";
import { Search } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export type CommandMenuItem = {
  /** Stable identifier for the item. */
  id: string;
  /** Text shown for the item and matched against the search query. */
  label: string;
  /** Optional secondary line shown under the label. */
  description?: string;
  /** Optional leading icon. */
  icon?: React.ReactNode;
  /** Optional trailing shortcut hint, e.g. "⌘P". */
  shortcut?: string;
  /** Extra terms matched against the search query. */
  keywords?: string[];
  /** Optional group heading the item is listed under. */
  group?: string;
  /** Called when the item is chosen. */
  onSelect?: () => void;
};

export type CommandMenuProps = {
  /** Items rendered in the menu, filtered by the search query. */
  items: CommandMenuItem[];
  /** Open state for controlled usage. */
  open?: boolean;
  /** Initial open state when uncontrolled. */
  defaultOpen?: boolean;
  /** Called whenever the open state changes. */
  onOpenChange?: (open: boolean) => void;
  /** Called with the chosen item, in addition to its own onSelect. */
  onSelect?: (item: CommandMenuItem) => void;
  /** Letter pressed with the modifier to open the menu. */
  hotkey?: string;
  /** Placeholder shown inside the search input. */
  placeholder?: string;
  /** Label shown inside the trigger before the shortcut chips. */
  triggerPlaceholder?: string;
  /** Message shown when no item matches the query. */
  emptyMessage?: string;
  /** Render the built-in search-style trigger. Set false to only use the hotkey. */
  showTrigger?: boolean;
  /** Extra classes merged onto the trigger. */
  className?: string;
};

function Kbd({
  children,
  pressed,
  className,
}: {
  children: React.ReactNode;
  pressed?: boolean;
  className?: string;
}) {
  return (
    <motion.kbd
      data-slot="command-menu-kbd"
      animate={{ scaleX: pressed ? 0.96 : 1, scaleY: pressed ? 0.84 : 1 }}
      transition={{ type: "spring", stiffness: 500, damping: 24, mass: 0.5 }}
      className={cn(
        "inline-flex min-w-6 origin-center items-center justify-center rounded-md border border-border bg-background px-1.5 py-0.5 font-sans text-[11px] font-medium select-none",
        pressed
          ? "text-foreground shadow-none"
          : "text-muted-foreground shadow-[0_1px_0_0_var(--border)]",
        className,
      )}
    >
      {children}
    </motion.kbd>
  );
}

export function CommandMenu({
  items,
  open,
  defaultOpen = false,
  onOpenChange,
  onSelect,
  hotkey = "k",
  placeholder = "Type a command or search…",
  triggerPlaceholder = "Search…",
  emptyMessage = "No results found.",
  showTrigger = true,
  className,
}: CommandMenuProps) {
  const isControlled = open !== undefined;
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  const isOpen = isControlled ? open : internalOpen;

  const [isMac, setIsMac] = React.useState(false);
  const [combo, setCombo] = React.useState(false);
  const [keys, setKeys] = React.useState({
    up: false,
    down: false,
    enter: false,
    esc: false,
  });
  const [query, setQuery] = React.useState("");
  const [rawActive, setRawActive] = React.useState(0);

  const modDownRef = React.useRef(false);
  const armedRef = React.useRef(false);
  const listRef = React.useRef<HTMLDivElement>(null);
  const key = hotkey.toLowerCase();

  const setOpen = React.useCallback(
    (next: boolean) => {
      // Reset the search whenever the menu opens.
      if (next) {
        setQuery("");
        setRawActive(0);
      }
      if (!isControlled) setInternalOpen(next);
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange],
  );

  React.useEffect(() => {
    // Platform detection is client-only; sync it once after mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMac(
      typeof navigator !== "undefined" &&
        /mac|iphone|ipad|ipod/i.test(navigator.platform || navigator.userAgent),
    );
  }, []);

  // Global hotkey: squeeze the chips only while the full combo is held,
  // then open on release.
  React.useEffect(() => {
    const usesMod = (e: KeyboardEvent) => (isMac ? e.metaKey : e.ctrlKey);
    const isMod = (k: string) => k === "control" || k === "meta";

    const onKeyDown = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (isMod(k)) modDownRef.current = true;
      if (k === key && usesMod(e)) {
        e.preventDefault();
        setCombo(true);
        armedRef.current = true;
      }
    };

    const onKeyUp = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      const released = armedRef.current && (isMod(k) || k === key);
      if (isMod(k)) modDownRef.current = false;
      if (released) {
        armedRef.current = false;
        setCombo(false);
        setOpen(!isOpen);
      }
    };

    const reset = () => {
      armedRef.current = false;
      modDownRef.current = false;
      setCombo(false);
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("blur", reset);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("blur", reset);
    };
  }, [isMac, key, isOpen, setOpen]);

  // Squeeze the footer chips for the nav keys while the menu is open.
  React.useEffect(() => {
    if (!isOpen) return;
    const map: Record<string, keyof typeof keys> = {
      arrowup: "up",
      arrowdown: "down",
      enter: "enter",
      escape: "esc",
    };
    const onDown = (e: KeyboardEvent) => {
      const name = map[e.key.toLowerCase()];
      if (name) setKeys((s) => ({ ...s, [name]: true }));
    };
    const onUp = (e: KeyboardEvent) => {
      const name = map[e.key.toLowerCase()];
      if (name) setKeys((s) => ({ ...s, [name]: false }));
    };
    window.addEventListener("keydown", onDown);
    window.addEventListener("keyup", onUp);
    return () => {
      window.removeEventListener("keydown", onDown);
      window.removeEventListener("keyup", onUp);
      setKeys({ up: false, down: false, enter: false, esc: false });
    };
  }, [isOpen]);

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((item) => {
      const haystack = [item.label, item.description, item.group, ...(item.keywords ?? [])]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [items, query]);

  // Clamp at render so the active row stays valid as results change.
  const activeIndex = Math.min(rawActive, Math.max(0, filtered.length - 1));

  // Keep the active item in view.
  React.useEffect(() => {
    const node = listRef.current?.querySelector<HTMLElement>(
      `[data-index="${activeIndex}"]`,
    );
    node?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  const handleSelect = (item: CommandMenuItem) => {
    item.onSelect?.();
    onSelect?.(item);
    setOpen(false);
  };

  const onListKeyDown = (e: React.KeyboardEvent) => {
    if (filtered.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setRawActive((activeIndex + 1) % filtered.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setRawActive((activeIndex - 1 + filtered.length) % filtered.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const item = filtered[activeIndex];
      if (item) handleSelect(item);
    }
  };

  // Preserve group order as first seen while flat indexing for keyboard nav.
  const groups = React.useMemo(() => {
    const order: string[] = [];
    const map = new Map<string, { item: CommandMenuItem; index: number }[]>();
    filtered.forEach((item, index) => {
      const g = item.group ?? "";
      if (!map.has(g)) {
        map.set(g, []);
        order.push(g);
      }
      map.get(g)!.push({ item, index });
    });
    return order.map((g) => ({ label: g, rows: map.get(g)! }));
  }, [filtered]);

  const modLabel = isMac ? "⌘" : "Ctrl";

  return (
    <>
      {showTrigger && (
        <button
          type="button"
          data-slot="command-menu-trigger"
          aria-label="Open command menu"
          onClick={() => setOpen(true)}
          className={cn(
            "group flex w-full max-w-sm cursor-text items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 text-sm text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            className,
          )}
        >
          <Search className="size-4 shrink-0 opacity-70" aria-hidden="true" />
          <span className="flex-1 text-left">{triggerPlaceholder}</span>
          <span className="flex items-center gap-1">
            <Kbd pressed={combo}>{modLabel}</Kbd>
            <Kbd pressed={combo} className="uppercase">
              {key}
            </Kbd>
          </span>
        </button>
      )}

      <Dialog open={isOpen} onOpenChange={setOpen}>
        <DialogContent
          showCloseButton={false}
          onOpenAutoFocus={(e) => {
            // Focus the search input, not the first item.
            e.preventDefault();
            (e.currentTarget as HTMLElement)
              .querySelector<HTMLInputElement>("input")
              ?.focus();
          }}
          aria-label="Command menu"
          className="max-w-xl gap-0 overflow-hidden p-0"
          onKeyDown={onListKeyDown}
        >
          <div className="flex items-center gap-2 border-b border-border px-4">
            <Search className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setRawActive(0);
              }}
              placeholder={placeholder}
              aria-label={placeholder}
              className="w-full bg-transparent py-3.5 text-sm text-foreground outline-none placeholder:text-muted-foreground"
            />
            <span className="hidden items-center gap-1 sm:flex">
              <Kbd pressed={combo}>{modLabel}</Kbd>
              <Kbd pressed={combo} className="uppercase">
                {key}
              </Kbd>
            </span>
          </div>

          <div
            ref={listRef}
            className="max-h-[min(60vh,380px)] overflow-y-auto overscroll-contain p-2"
          >
            {filtered.length === 0 ? (
              <p className="px-3 py-8 text-center text-sm text-muted-foreground">
                {emptyMessage}
              </p>
            ) : (
              groups.map((group) => (
                <div key={group.label || "_"} className="mb-1 last:mb-0">
                  {group.label && (
                    <div className="px-3 pt-2 pb-1 text-xs font-medium text-muted-foreground">
                      {group.label}
                    </div>
                  )}
                  {group.rows.map(({ item, index }) => {
                    const active = index === activeIndex;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        data-index={index}
                        data-active={active || undefined}
                        onMouseMove={() => setRawActive(index)}
                        onClick={() => handleSelect(item)}
                        className={cn(
                          "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors",
                          active
                            ? "bg-accent text-accent-foreground"
                            : "text-foreground",
                        )}
                      >
                        {item.icon && (
                          <span className="grid size-5 shrink-0 place-items-center opacity-80">
                            {item.icon}
                          </span>
                        )}
                        <span className="flex-1 truncate">
                          <span className="block truncate">{item.label}</span>
                          {item.description && (
                            <span
                              className={cn(
                                "block truncate text-xs text-muted-foreground",
                              )}
                            >
                              {item.description}
                            </span>
                          )}
                        </span>
                        {item.shortcut && (
                          <Kbd className="ml-auto">{item.shortcut}</Kbd>
                        )}
                      </button>
                    );
                  })}
                </div>
              ))
            )}
          </div>

          <div className="flex items-center gap-4 border-t border-border px-4 py-2.5 text-[11px] text-muted-foreground">
            <span className="flex items-center gap-1">
              <Kbd pressed={keys.up}>↑</Kbd>
              <Kbd pressed={keys.down}>↓</Kbd>
              navigate
            </span>
            <span className="flex items-center gap-1">
              <Kbd pressed={keys.enter}>↵</Kbd>
              select
            </span>
            <span className="ml-auto flex items-center gap-1">
              <Kbd pressed={keys.esc}>esc</Kbd>
              close
            </span>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default CommandMenu;
