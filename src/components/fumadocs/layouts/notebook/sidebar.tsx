"use client";

import type {ComponentProps} from "react";

import * as Base from "fumadocs-ui/components/sidebar/base";
import {createPageTreeRenderer} from "fumadocs-ui/components/sidebar/page-tree";
import {useRef} from "react";
import {tv} from "tailwind-variants";

import {mergeRefs} from "@/components/fumadocs/utils/merge-refs";
import {cn} from "@/utils/cn";


const itemVariants = tv({
  base: "text-fd-muted-foreground relative flex flex-row items-center gap-2 rounded-lg px-3 py-2 text-start [&_svg]:size-4 [&_svg]:shrink-0",
  variants: {
    highlight: {
      true: "data-[active=true]:before:bg-fd-primary data-[active=true]:before:absolute data-[active=true]:before:inset-y-2.5 data-[active=true]:before:start-2.5 data-[active=true]:before:w-px data-[active=true]:before:content-['']",
    },
    variant: {
      button:
        "hover:bg-fd-accent/50 hover:text-fd-accent-foreground/80 transition-colors hover:transition-none",
      link: "hover:bg-fd-accent/50 hover:text-fd-accent-foreground/80 data-[active=true]:bg-fd-primary/10 data-[active=true]:text-fd-primary transition-colors hover:transition-none data-[active=true]:hover:transition-colors",
    },
  },
});

function getItemOffset(depth: number) {
  return `calc(${2 + 3 * depth} * var(--spacing))`;
}

export const {
  SidebarFolder,
  SidebarProvider: Sidebar,
  SidebarTrigger,
  SidebarViewport,
} = Base;

export function SidebarContent({
  children,
  className,
  ref: refProp,
  ...props
}: ComponentProps<"aside">) {
  const ref = useRef<HTMLElement>(null);

  return (
    <Base.SidebarContent>
      {({collapsed, hovered, ref: asideRef, ...rest}) => (
        <div
          data-sidebar-placeholder=""
          className={cn(
            "md:layout:[--fd-sidebar-width:268px] pointer-events-none sticky z-20 [grid-area:sidebar] *:pointer-events-auto max-md:hidden",
            "top-(--fd-docs-row-2) h-[calc(var(--fd-docs-height)-var(--fd-docs-row-2))]",
          )}
        >
          {!!collapsed && <div className="absolute inset-y-0 start-0 w-4" {...rest} />}
          <aside
            ref={mergeRefs(ref, refProp, asideRef)}
            data-collapsed={collapsed}
            data-hovered={!!collapsed && hovered}
            id="nd-sidebar"
            className={cn(
              "absolute inset-y-0 start-0 flex w-full flex-col items-end text-sm duration-250 *:w-(--fd-sidebar-width)",
                collapsed && [
                "bg-fd-card inset-y-2 w-(--fd-sidebar-width) rounded-xl border transition-transform",
                hovered
                  ? "translate-x-2 shadow-lg rtl:-translate-x-2"
                  : "-translate-x-(--fd-sidebar-width) rtl:translate-x-full",
              ],
              ref.current &&
                (ref.current.getAttribute("data-collapsed") === "true") !== collapsed &&
                "transition-[width,inset-block,translate,background-color]",
              className,
            )}
            {...props}
            {...rest}
          >
            {children}
          </aside>
        </div>
      )}
    </Base.SidebarContent>
  );
}

export function SidebarDrawer({
  children,
  className,
  ...props
}: ComponentProps<typeof Base.SidebarDrawerContent>) {
  return (
    <>
      <Base.SidebarDrawerOverlay className="data-[state=open]:animate-fd-fade-in data-[state=closed]:animate-fd-fade-out fixed inset-0 z-40 backdrop-blur-xs" />
      <Base.SidebarDrawerContent
        className={cn(
          "bg-fd-background data-[state=open]:animate-fd-sidebar-in data-[state=closed]:animate-fd-sidebar-out fixed inset-y-0 end-0 z-40 flex w-[85%] max-w-[380px] flex-col text-[0.9375rem] shadow-lg",
          className,
        )}
        {...props}
      >
        {children}
      </Base.SidebarDrawerContent>
    </>
  );
}

export function SidebarSeparator({children, className, style, ...props}: ComponentProps<"p">) {
  const depth = Base.useFolderDepth();

  return (
    <Base.SidebarSeparator
      className={cn("mb-1.5 [&_svg]:size-4 [&_svg]:shrink-0", className)}
      style={{
        paddingInlineStart: getItemOffset(depth),
        ...style,
      }}
      {...props}
    >
      {children}
    </Base.SidebarSeparator>
  );
}

export function SidebarItem({
  children,
  className,
  style,
  ...props
}: ComponentProps<typeof Base.SidebarItem>) {
  const depth = Base.useFolderDepth();

  return (
    <Base.SidebarItem
      className={cn(itemVariants({highlight: depth >= 1, variant: "link"}), className)}
      style={{
        ...(depth > 0 ? {paddingInlineStart: getItemOffset(depth)} : {}),
        ...style,
      }}
      {...props}
    >
      {children}
    </Base.SidebarItem>
  );
}

export function SidebarFolderTrigger({
  className,
  style,
  ...props
}: ComponentProps<typeof Base.SidebarFolderTrigger>) {
  const {collapsible, depth} = Base.useFolder()!;

  return (
    <Base.SidebarFolderTrigger
      className={itemVariants({
        class: `w-full ${className}`,
        variant: collapsible ? "button" : undefined,
      })}
      style={{
        paddingInlineStart: getItemOffset(depth - 1),
        ...style,
      }}
      {...props}
    >
      {props.children}
    </Base.SidebarFolderTrigger>
  );
}

export function SidebarFolderLink({
  className,
  style,
  ...props
}: ComponentProps<typeof Base.SidebarFolderLink>) {
  const depth = Base.useFolderDepth();

  return (
    <Base.SidebarFolderLink
      className={cn(itemVariants({highlight: depth > 1, variant: "link"}), "w-full", className)}
      style={{
        paddingInlineStart: getItemOffset(depth - 1),
        ...style,
      }}
      {...props}
    >
      {props.children}
    </Base.SidebarFolderLink>
  );
}

export function SidebarFolderContent({
  children,
  className,
  ...props
}: ComponentProps<typeof Base.SidebarFolderContent>) {
  const depth = Base.useFolderDepth();

  return (
    <Base.SidebarFolderContent
      className={cn(
        itemVariants({
          class: "relative",
          highlight: depth === 1,
        }),
        className,
      )}
      {...props}
    >
      {children}
    </Base.SidebarFolderContent>
  );
}
export const SidebarPageTree = createPageTreeRenderer({
  SidebarFolder,
  SidebarFolderContent,
  SidebarFolderLink,
  SidebarFolderTrigger,
  SidebarItem,
  SidebarSeparator,
});
