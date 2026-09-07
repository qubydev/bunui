"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { activeComponent } from "@/lib/components";
import { cn } from "@/lib/utils";
import CopyButton from "../CopyButton";
import DescriptionContent from "../Description/DescriptionContent";
import PanelCode from "../Description/PanelCode";
import { fetchSource, SOURCE_LOADING } from "../Description/fetchSource";

type ViewMode = "preview" | "code";

const tabs: { id: ViewMode; label: string }[] = [
  { id: "preview", label: "Preview" },
  { id: "code", label: "Code" },
];

export default function SidebarShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const item = activeComponent(pathname);
  const [mode, setMode] = useState<ViewMode>("preview");
  const [source, setSource] = useState<string | null>(null);

  useEffect(() => {
    setMode("preview");
    setSource(null);
  }, [pathname]);

  useEffect(() => {
    if (mode !== "code" || !item?.registry) return;
    if (source && source !== SOURCE_LOADING) return;

    let cancelled = false;
    setSource(SOURCE_LOADING);

    fetchSource(item.registry).then((value) => {
      if (!cancelled) setSource(value);
    });

    return () => {
      cancelled = true;
    };
  }, [item?.registry, mode]);

  return (
    <div className="relative h-full min-h-0 overflow-hidden bg-background">
      <main className="no-scrollbar h-full min-h-0 overflow-y-auto pb-24 pt-24">
        {mode === "preview" ? (
          <div className="mx-auto flex w-full max-w-5xl flex-col px-4 sm:px-8">
            <div className="h-72 w-full overflow-hidden sm:h-80 lg:h-[360px]">{children}</div>
            <section className="py-6">
              <DescriptionContent
                item={item}
                showSourceHint={false}
                className="gap-8"
              />
            </section>
          </div>
        ) : (
          <div className="mx-auto flex min-h-full w-full max-w-5xl items-start px-4 sm:px-8">
            {item?.registry ? (
              <div className="w-full overflow-hidden rounded-xl border border-border bg-popover">
                <div className="flex h-11 items-center justify-between border-b border-border bg-popover px-4">
                  <span className="font-mono text-xs text-muted-foreground">
                    {item.registry}.tsx
                  </span>
                  <CopyButton
                    value={source && source !== SOURCE_LOADING ? source : ""}
                    label="Copy code"
                    disabled={!source || source === SOURCE_LOADING}
                    className="h-8 rounded-md px-2.5 text-xs"
                  />
                </div>
                <PanelCode
                  code={source ?? SOURCE_LOADING}
                  showLineNumbers
                  className="w-full rounded-none"
                />
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                Source is not available for this component.
              </p>
            )}
          </div>
        )}
      </main>

      <nav
        aria-label="Component view"
        className="fixed bottom-4 right-4 z-40 flex items-center gap-0.5 rounded-full border border-border bg-popover/92 p-1 backdrop-blur-xl sm:bottom-5 sm:right-5"
      >
        {tabs.map((tab) => {
          const active = mode === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setMode(tab.id)}
              aria-pressed={active}
              className={cn(
                "h-8 rounded-full px-3.5 text-[11px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:h-9 sm:px-4 sm:text-xs",
                active
                  ? "bg-primary text-primary-foreground shadow-primary-inset"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
