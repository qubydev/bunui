"use client";

import {X} from "lucide-react";
import {
  SidebarDrawerContent,
  SidebarDrawerOverlay,
  SidebarTrigger,
} from "fumadocs-ui/components/sidebar/base";

import {BunUILogo} from "@/components/bunui-logo";
import {BunUILogotype} from "@/components/bunui-logotype";
import {GitHubLink, ThemeToggle} from "@/components/topbar";

export function MobileSidebar() {
  return (
    <>
      <SidebarDrawerOverlay className="fixed inset-0 z-40 bg-background/70 backdrop-blur-sm data-[state=open]:animate-fd-fade-in data-[state=closed]:animate-fd-fade-out md:hidden" />
      <SidebarDrawerContent className="fixed inset-y-0 right-0 z-40 flex w-[82%] max-w-80 flex-col border-l bg-background shadow-xl data-[state=open]:animate-fd-sidebar-in data-[state=closed]:animate-fd-sidebar-out md:hidden">
        <div className="flex h-14 items-center px-4">
          <div className="inline-flex items-center gap-1.5">
            <BunUILogo size={24} />
            <BunUILogotype height={18} />
          </div>
          <SidebarTrigger className="ml-auto inline-flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
            <X className="size-4.5" />
          </SidebarTrigger>
        </div>

        <div className="flex-1" />

        <div className="flex items-center justify-between p-4">
          <ThemeToggle />
          <GitHubLink />
        </div>
      </SidebarDrawerContent>
    </>
  );
}
