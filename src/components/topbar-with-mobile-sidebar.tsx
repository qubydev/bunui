import {TreeContextProvider} from "fumadocs-ui/contexts/tree";

import {componentTree} from "@/components/component-tree";
import {Topbar} from "@/components/topbar";
import {
  MobileSidebarTrigger,
  Sidebar,
  SidebarDrawer,
  SidebarDrawerClose,
  SidebarPageTree,
  SidebarViewport,
} from "@/components/fumadocs/layouts/notebook/sidebar";

export function TopbarWithMobileSidebar() {
  const viewport = () => (
    <SidebarViewport>
      <SidebarPageTree />
    </SidebarViewport>
  );

  return (
    <TreeContextProvider tree={componentTree}>
      <Sidebar defaultOpenLevel={0}>
        <SidebarDrawer>
          <div className="flex p-4 pb-2">
            <SidebarDrawerClose className="ms-auto" />
          </div>
          {viewport()}
        </SidebarDrawer>
        <Topbar mobileSidebarTrigger={<MobileSidebarTrigger />} />
      </Sidebar>
    </TreeContextProvider>
  );
}
