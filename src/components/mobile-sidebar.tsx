"use client";

import {X} from "lucide-react";
import Link from "next/link";
import {
  SidebarDrawerContent,
  SidebarDrawerOverlay,
  useSidebar,
} from "fumadocs-ui/components/sidebar/base";

import {BunUILogo} from "@/components/bunui-logo";
import {BunUILogotype} from "@/components/bunui-logotype";
import {GitHubLink, ThemeToggle} from "@/components/topbar";
import {Button} from "@/components/ui/button";

export function MobileSidebar() {
  const {setOpen} = useSidebar();

  return (
    <>
      <SidebarDrawerOverlay className="fixed inset-0 z-40 bg-background/70 backdrop-blur-sm data-[state=open]:animate-fd-fade-in data-[state=closed]:animate-fd-fade-out md:hidden" />
      <SidebarDrawerContent className="fixed inset-y-0 right-0 z-40 flex w-[82%] max-w-80 flex-col border-l bg-background shadow-xl data-[state=open]:animate-fd-sidebar-in data-[state=closed]:animate-fd-sidebar-out md:hidden">
        <div className="flex h-14 items-center px-4">
          <div className="inline-flex items-center gap-1.5">
            <BunUILogo size={24} />
            <BunUILogotype height={18} />
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="ml-auto size-8"
            aria-label="Close sidebar"
            aria-controls="nd-sidebar-mobile"
            onClick={() => setOpen(false)}
          >
            <X className="size-5" />
          </Button>
        </div>

        <nav className="flex flex-1 flex-col gap-6 px-4 py-5">
          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">Overview</p>
            <Link className="block rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground" href="/components">
              All Components
            </Link>
          </div>
          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">Components</p>
            <Link className="block rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground" href="/components/button">
              Button
            </Link>
          </div>
        </nav>

        <div className="flex items-center justify-between p-4">
          <ThemeToggle />
          <GitHubLink />
        </div>
      </SidebarDrawerContent>
    </>
  );
}
