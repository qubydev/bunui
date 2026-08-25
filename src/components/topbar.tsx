"use client";

import Link from "next/link";
import {useEffect, useState} from "react";
import {Moon, PanelRight, Sun, X} from "lucide-react";
import {useTheme} from "next-themes";
import {FullSearchTrigger, SearchTrigger} from "fumadocs-ui/layouts/shared/slots/search-trigger";
import {SidebarTrigger, useSidebar} from "fumadocs-ui/components/sidebar/base";

import {BunUILogo} from "@/components/bunui-logo";
import {BunUILogotype} from "@/components/bunui-logotype";
import {Button} from "@/components/ui/button";

export function ThemeToggle() {
  const {resolvedTheme, setTheme} = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const dark = mounted && resolvedTheme === "dark";

  return (
    <div className="inline-flex h-8 items-center rounded-full border bg-background p-0.5">
      <button
        type="button"
        aria-label="Use light theme"
        aria-pressed={!dark}
        disabled={!mounted}
        className={`inline-flex size-7 items-center justify-center rounded-full transition-colors ${!dark ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"}`}
        onClick={() => setTheme("light")}
      >
        <Sun className="size-3.5" />
      </button>
      <button
        type="button"
        aria-label="Use dark theme"
        aria-pressed={dark}
        disabled={!mounted}
        className={`inline-flex size-7 items-center justify-center rounded-full transition-colors ${dark ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"}`}
        onClick={() => setTheme("dark")}
      >
        <Moon className="size-3.5" />
      </button>
    </div>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5 fill-current" aria-hidden="true">
      <path d="M12 .7a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2.23c-3.22.7-3.9-1.37-3.9-1.37-.52-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.72 1.27 3.38.97.1-.75.4-1.27.74-1.56-2.57-.3-5.27-1.29-5.27-5.69 0-1.26.45-2.29 1.2-3.1-.12-.3-.52-1.47.11-3.06 0 0 .98-.31 3.16 1.18a10.9 10.9 0 0 1 5.75 0c2.18-1.49 3.16-1.18 3.16-1.18.63 1.59.23 2.76.11 3.06.75.81 1.2 1.84 1.2 3.1 0 4.41-2.71 5.39-5.28 5.68.42.36.78 1.06.78 2.14v3.26c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .7Z" />
    </svg>
  );
}

export function GitHubLink() {
  return (
    <Button
      variant="ghost"
      size="icon"
      nativeButton={false}
      render={<a href="https://github.com/qubydev/bunui" target="_blank" rel="noreferrer" aria-label="Bun UI on GitHub" />}
    >
      <GitHubIcon />
    </Button>
  );
}

function MobileSidebarTrigger() {
  const {open} = useSidebar();

  return (
    <SidebarTrigger className="relative inline-flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground md:hidden">
      <PanelRight
        className={`absolute size-4.5 transition-all duration-200 ${open ? "scale-75 rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100"}`}
      />
      <X
        className={`absolute size-4.5 transition-all duration-200 ${open ? "scale-100 rotate-0 opacity-100" : "scale-75 -rotate-90 opacity-0"}`}
      />
    </SidebarTrigger>
  );
}

export function Topbar() {
  return (
    <header className="sticky top-0 z-20 bg-background">
      <div className="flex h-14 w-full items-center gap-3 px-4 sm:px-6">
        <div className="flex min-w-0 flex-1 items-center">
          <Link href="/" className="inline-flex items-center gap-1.5" aria-label="Bun UI home">
            <BunUILogo size={26} />
            <BunUILogotype height={20} />
          </Link>
        </div>

        <FullSearchTrigger hideIfDisabled className="hidden h-8 w-[25rem] max-w-[40vw] md:flex" />

        <div className="flex min-w-0 flex-1 items-center justify-end gap-1">
          <div className="md:hidden">
            <SearchTrigger hideIfDisabled className="size-8" />
          </div>

          <div className="hidden items-center gap-1 md:flex">
            <ThemeToggle />
            <GitHubLink />
          </div>

          <MobileSidebarTrigger />
        </div>
      </div>
    </header>
  );
}
