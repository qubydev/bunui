"use client";

import type {ComponentProps, ReactNode} from "react";
import {createContext, useContext} from "react";
import {useSidebar} from "fumadocs-ui/components/sidebar/base";
import {cn} from "@/utils/cn";

export const LayoutContext = createContext({isNavTransparent: false});

export function LayoutContextProvider({children}: {children: ReactNode}) {
  return <LayoutContext value={{isNavTransparent: false}}>{children}</LayoutContext>;
}

export function LayoutBody({children, className, style, ...props}: ComponentProps<"div">) {
  const {collapsed} = useSidebar();
  const pageCol = "calc(var(--fd-layout-width,97rem) - var(--fd-sidebar-col) - var(--fd-toc-width))";

  return (
    <div
      id="nd-notebook-layout"
      className={cn(
        "grid min-h-(--fd-docs-height) auto-cols-auto auto-rows-auto overflow-x-clip transition-[grid-template-columns] [--fd-docs-height:100dvh] [--fd-header-height:56px] [--fd-sidebar-width:0px] [--fd-toc-popover-height:0px] [--fd-toc-width:0px]",
        className,
      )}
      style={{
        "--fd-docs-row-1": "var(--fd-banner-height, 0px)",
        "--fd-docs-row-2": "calc(var(--fd-docs-row-1) + var(--fd-header-height))",
        "--fd-docs-row-3": "calc(var(--fd-docs-row-2) + var(--fd-toc-popover-height))",
        "--fd-sidebar-col": collapsed ? "0px" : "var(--fd-sidebar-width)",
        gridTemplate: `". header header header ."
          "sidebar sidebar toc-popover toc-popover ."
          "sidebar sidebar main toc ." 1fr / minmax(min-content, 1fr) var(--fd-sidebar-col) minmax(0, ${pageCol}) var(--fd-toc-width) minmax(min-content, 1fr)`,
        ...style,
      } as React.CSSProperties}
      {...props}
    >
      {children}
    </div>
  );
}