"use client";

import type {SharedProps, SearchItemType} from "fumadocs-ui/components/dialog/search";
import {
  SearchDialog,
  SearchDialogContent,
  SearchDialogHeader,
  SearchDialogIcon,
  SearchDialogInput,
  SearchDialogList,
  SearchDialogOverlay,
} from "fumadocs-ui/components/dialog/search";
import {useRouter} from "next/navigation";
import {useMemo, useState} from "react";

export default function BunSearchDialog(props: SharedProps) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const items = useMemo<SearchItemType[]>(() => {
    const query = search.toLowerCase();
    const entries = [
      {
        id: "button",
        title: "Button",
        description: "Displays a button or a component that looks like a button.",
        href: "/components/button",
      },
      {
        id: "input",
        title: "Input",
        description: "A playful text input with soft springy focus interactions.",
        href: "/components/input",
      },
    ];

    return entries
      .filter((item) => !query || `${item.title} ${item.description}`.toLowerCase().includes(query))
      .map((item) => ({
        id: item.id,
        type: "action" as const,
        node: <div><p className="font-medium">{item.title}</p><p className="text-xs text-fd-muted-foreground">{item.description}</p></div>,
        onSelect: () => router.push(item.href),
      }));
  }, [router, search]);

  return (
    <SearchDialog {...props} search={search} onSearchChange={setSearch}>
      <SearchDialogOverlay className="bg-[var(--search-dialog-backdrop)] backdrop-blur-sm" />
      <SearchDialogContent className="bun-search-dialog border border-[var(--search-dialog-border)] bg-[var(--search-dialog-background)] text-foreground shadow-[var(--search-dialog-shadow)]">
        <SearchDialogHeader className="border-b border-[var(--search-dialog-border)] bg-[var(--search-dialog-header-background)]">
          <SearchDialogIcon className="!text-field-placeholder" />
          <SearchDialogInput className="text-foreground placeholder:!text-field-placeholder" placeholder="Search components..." />
        </SearchDialogHeader>
        <SearchDialogList items={items} />
      </SearchDialogContent>
    </SearchDialog>
  );
}
