"use client";

import type { SharedProps, SearchItemType } from "fumadocs-ui/components/dialog/search";
import {
  SearchDialog,
  SearchDialogContent,
  SearchDialogHeader,
  SearchDialogIcon,
  SearchDialogInput,
  SearchDialogList,
  SearchDialogOverlay,
} from "fumadocs-ui/components/dialog/search";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

export default function BunSearchDialog(props: SharedProps) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const items = useMemo<SearchItemType[]>(() => {
    if (search && !"button".includes(search.toLowerCase())) return [];
    return [{
      id: "button",
      type: "action",
      node: <div><p className="font-medium">Button</p><p className="text-xs text-fd-muted-foreground">Displays a button or a component that looks like a button.</p></div>,
      onSelect: () => router.push("/components/button"),
    }];
  }, [router, search]);

  return (
    <SearchDialog {...props} search={search} onSearchChange={setSearch}>
      <SearchDialogOverlay className="bg-black/55 backdrop-blur-sm" />
      <SearchDialogContent className="bun-search-dialog border border-separator bg-background text-foreground shadow-[0_18px_60px_rgba(0,0,0,0.22)] dark:border-white/10 dark:bg-[#111113]">
        <SearchDialogHeader className="border-b border-separator bg-background-secondary dark:border-white/10 dark:bg-[#18181b]">
          <SearchDialogIcon className="text-muted" />
          <SearchDialogInput className="text-foreground placeholder:text-muted" placeholder="Search components..." />
        </SearchDialogHeader>
        <SearchDialogList items={items} />
      </SearchDialogContent>
    </SearchDialog>
  );
}
