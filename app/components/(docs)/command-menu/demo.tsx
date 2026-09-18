"use client";

import {
  Headset,
  LayoutDashboard,
  Moon,
  Settings,
  User,
} from "lucide-react";
import { CommandMenu, type CommandMenuItem } from "@/components/ui/command-menu";

const items: CommandMenuItem[] = [
  {
    id: "dashboard",
    label: "Go to Dashboard",
    icon: <LayoutDashboard />,
    group: "Navigation",
    keywords: ["home", "overview"],
  },
  {
    id: "profile",
    label: "Open Profile",
    icon: <User />,
    group: "Navigation",
    shortcut: "⇧P",
  },
  {
    id: "theme",
    label: "Toggle Theme",
    icon: <Moon />,
    group: "Preferences",
    keywords: ["dark", "light", "appearance"],
  },
  {
    id: "settings",
    label: "Settings",
    icon: <Settings />,
    group: "Preferences",
    shortcut: "⌘,",
  },
  {
    id: "support",
    label: "Contact Support",
    icon: <Headset />,
    group: "Preferences",
    keywords: ["help", "docs"],
  },
];

export default function CommandMenuDemo() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 px-4">
      <CommandMenu
        items={items}
        onSelect={(item) => console.log("selected", item.id)}
      />
      <p className="text-xs text-muted-foreground">
        Hold the shortcut to squeeze the keys, then release to open.
      </p>
    </div>
  );
}
