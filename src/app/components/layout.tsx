import type {ReactNode} from "react";
import Link from "next/link";
import {DocsLayout} from "fumadocs-ui/layouts/notebook";
import {FullSearchTrigger} from "fumadocs-ui/layouts/shared/slots/search-trigger";

import {BunUILogo} from "@/components/bunui-logo";
import {BunUILogotype} from "@/components/bunui-logotype";
import {
  componentsDocsSearchTriggerSlot,
  componentsDocsSidebarSlot,
} from "@/components/components-docs-slots";
import {componentTree} from "@/components/component-tree";
import {GitHubLink, ThemeToggle} from "@/components/topbar";

function DocsNavActions() {
  return (
    <div className="flex w-full items-center justify-between gap-2 md:w-auto md:justify-start">
      <FullSearchTrigger hideIfDisabled className="hidden h-8 w-68 shrink-0 rounded-full md:flex" />
      <ThemeToggle />
      <GitHubLink />
    </div>
  );
}

function DocsSidebarBrand() {
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-1.5"
      aria-label="Bun UI home"
    >
      <BunUILogo size={24} />
      <BunUILogotype height={18} />
    </Link>
  );
}

export default function ComponentsLayout({children}: {children: ReactNode}) {
  return (
    <DocsLayout
      tree={componentTree}
      nav={{
        mode: "top",
        title: (
          <span className="inline-flex items-center gap-1.5">
            <BunUILogo size={26} />
            <BunUILogotype height={20} />
          </span>
        ),
        url: "/",
      }}
      sidebar={{
        banner: <DocsSidebarBrand />,
        collapsible: false,
        defaultOpenLevel: 1,
      }}
      searchToggle={{
        full: {
          className: "hidden!",
        },
      }}
      slots={{
        searchTrigger: componentsDocsSearchTriggerSlot,
        sidebar: componentsDocsSidebarSlot,
      }}
      themeSwitch={{
        component: <DocsNavActions />,
      }}
    >
      {children}
    </DocsLayout>
  );
}
