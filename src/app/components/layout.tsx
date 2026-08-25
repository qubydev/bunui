import type {ReactNode} from "react";
import {SidebarProvider} from "fumadocs-ui/components/sidebar/base";

import {MobileSidebar} from "@/components/mobile-sidebar";
import {ComponentsSidebar} from "@/components/components-sidebar";
import {Topbar} from "@/components/topbar";

export default function ComponentsLayout({children}: {children: ReactNode}) {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background">
        <Topbar />
        <MobileSidebar />
        <div className="flex min-h-[calc(100vh-3.5rem)]">
          <ComponentsSidebar />
          <div className="min-w-0 flex-1">{children}</div>
        </div>
      </div>
    </SidebarProvider>
  );
}
