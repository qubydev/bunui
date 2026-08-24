import type * as PageTree from "fumadocs-core/page-tree";
import type {ReactNode} from "react";

import {TreeContextProvider} from "fumadocs-ui/contexts/tree";

import {Topbar} from "@/components/topbar";
import {LayoutBody, LayoutContextProvider} from "./client";
import {
  Sidebar,
  SidebarContent,
  SidebarDrawer,
  SidebarDrawerClose,
  MobileSidebarTrigger,
  SidebarPageTree,
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
                <SidebarDrawerClose className="ms-auto" />
              </div>
              {viewport()}
            </SidebarDrawer>
            <Topbar mobileSidebarTrigger={<MobileSidebarTrigger />} />
            {children}
          </LayoutBody>
        </Sidebar>
      </LayoutContextProvider>
    </TreeContextProvider>
  );
}
