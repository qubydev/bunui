import type * as PageTree from "fumadocs-core/page-tree";
import type {ReactNode} from "react";

import {buttonVariants} from "fumadocs-ui/components/ui/button";
import {TreeContextProvider} from "fumadocs-ui/contexts/tree";

import {X} from "@/components/fumadocs/ui/icons";
import {Topbar} from "@/components/topbar";
import {cn} from "@/utils/cn";
import {LayoutBody, LayoutContextProvider} from "./client";
import {
  Sidebar,
  SidebarContent,
  SidebarDrawer,
  SidebarPageTree,
  SidebarTrigger,
  SidebarViewport,
} from "./sidebar";

export interface DocsLayoutProps {
  tree: PageTree.Root;
  children: ReactNode;
}

export function DocsLayout({children, tree}: DocsLayoutProps) {
  const viewport = () => (
    <SidebarViewport>
      <SidebarPageTree />
    </SidebarViewport>
  );

  return (
    <TreeContextProvider tree={tree}>
      <LayoutContextProvider>
        <Sidebar defaultOpenLevel={0}>
          <LayoutBody>
            <SidebarContent>{viewport()}</SidebarContent>
            <SidebarDrawer>
              <div className="flex p-4 pb-2">
                <SidebarTrigger
                  aria-label="Close sidebar"
                  className={cn(
                    buttonVariants({
                      className: "text-fd-muted-foreground ms-auto",
                      color: "ghost",
                      size: "icon-sm",
                    }),
                  )}
                >
                  <X />
                </SidebarTrigger>
              </div>
              {viewport()}
            </SidebarDrawer>
            <Topbar />
            {children}
          </LayoutBody>
        </Sidebar>
      </LayoutContextProvider>
    </TreeContextProvider>
  );
}