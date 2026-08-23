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
      <SearchDialogOverlay />
      <SearchDialogContent>
        <SearchDialogHeader>
          <SearchDialogIcon />
          <SearchDialogInput placeholder="Search components..." />
        </SearchDialogHeader>
        <SearchDialogList items={items} />
      </SearchDialogContent>
    </SearchDialog>
  );
}
