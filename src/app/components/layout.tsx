import type {ReactNode} from "react";
import {DocsLayout} from "fumadocs-ui/layouts/notebook";
import {FullSearchTrigger} from "fumadocs-ui/layouts/shared/slots/search-trigger";

import {BunUILogo} from "@/components/bunui-logo";
import {BunUILogotype} from "@/components/bunui-logotype";
import {componentTree} from "@/components/component-tree";
import {GitHubLink, ThemeToggle} from "@/components/topbar";

function DocsNavActions() {
  return (
    <div className="flex items-center gap-2">
      <FullSearchTrigger hideIfDisabled className="hidden h-8 w-68 shrink-0 rounded-full md:flex" />
      <ThemeToggle />
      <GitHubLink />
    </div>
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
        collapsible: false,
        defaultOpenLevel: 1,
      }}
      searchToggle={{
        full: {
          className: "hidden!",
        },
      }}
      themeSwitch={{
        component: <DocsNavActions />,
      }}
    >
      {children}
    </DocsLayout>
  );
}
