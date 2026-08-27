"use client";

import type {ComponentProps, ReactNode} from "react";
import {cloneElement, isValidElement} from "react";
import {Search, SidebarIcon} from "lucide-react";
import {useSearchContext} from "fumadocs-ui/contexts/search";
import {
  FullSearchTrigger,
  type SearchTriggerProps,
} from "fumadocs-ui/layouts/shared/slots/search-trigger";
import {
  Sidebar,
  SidebarCollapseTrigger,
  SidebarProvider,
  useSidebar,
} from "fumadocs-ui/layouts/notebook/slots/sidebar";

import type {DocsSlots} from "fumadocs-ui/layouts/notebook";

import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";

function withIconSize(children: ReactNode) {
  if (!isValidElement<{className?: string}>(children)) {
    return children;
  }

  return cloneElement(children, {
    className: cn("size-5", children.props.className),
  });
}

function AnimatedSearchTrigger({
  className,
  disabled,
  hideIfDisabled,
}: SearchTriggerProps) {
  const {enabled, setOpenSearch} = useSearchContext();

  if (hideIfDisabled && !enabled) return null;

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-sm"
      className={cn("p-2", className)}
      aria-label="Open search"
      disabled={disabled}
      onClick={() => setOpenSearch(true)}
    >
      <Search className="size-5" />
    </Button>
  );
}

function AnimatedSidebarTrigger({
  className,
  children,
  disabled,
  onClick,
}: ComponentProps<"button">) {
  const {open, setOpen} = useSidebar();

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-sm"
      className={cn("p-2 -me-1.5", className)}
      aria-label={open ? "Close Sidebar" : "Open Sidebar"}
      aria-expanded={open}
      aria-controls="nd-sidebar-mobile"
      disabled={disabled}
      onClick={(event) => {
        onClick?.(event);

        if (!event.defaultPrevented) {
          setOpen((value) => !value);
        }
      }}
    >
      {withIconSize(children ?? <SidebarIcon />)}
    </Button>
  );
}

export const componentsDocsSearchTriggerSlot = {
  sm: AnimatedSearchTrigger,
  full: FullSearchTrigger,
} satisfies NonNullable<DocsSlots["searchTrigger"]>;

export const componentsDocsSidebarSlot = {
  provider: SidebarProvider,
  root: Sidebar,
  trigger: AnimatedSidebarTrigger,
  collapseTrigger: SidebarCollapseTrigger,
  useSidebar,
} satisfies DocsSlots["sidebar"];
