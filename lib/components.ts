import type { ReactNode } from "react";

export type Dependency = {
  name: string;
  icon?: ReactNode;
};

export type ComponentProp = {
  name: string;
  type: string;
  default?: string;
  required?: boolean;
  options?: string[];
  control?: "swatch";
  optionColors?: Record<string, string>;
  description: string;
};

export type ComponentCategory =
  | "ai"
  | "navigation"
  | "inputs"
  | "feedback"
  | "display";

export const CATEGORY_LABELS: Record<ComponentCategory, string> = {
  ai: "AI kit",
  navigation: "Navigation",
  inputs: "Inputs",
  feedback: "Feedback",
  display: "Display",
};

export const CATEGORY_ORDER: ComponentCategory[] = [
  "display",
  "ai",
  "navigation",
  "inputs",
  "feedback",
];

export type ComponentCreator = {
  handle: string;
  url?: string;
  name?: string;
  avatar?: string;
};

export type ComponentItem = {
  name: string;
  href: string;
  category: ComponentCategory;
  isNew?: boolean;
  description?: string;
  note?: string;
  creator?: ComponentCreator;
  registry?: string;
  source?: string;
  preview?: string;
  featured?: boolean;
  dependencies?: Dependency[];
  interaction?: string;
  usage?: string;
  props?: ComponentProp[];
  credits?: string[];
};

export const REGISTRY_HOMEPAGE = "https://github.com/qubydev/bunui";
export const REGISTRY_REPO = "qubydev/bunui";

export const PANEL_INFO = {
  sourceHint:
    "Click the code icon in the top-right corner to view the source code.",
  keepInMind:
    "Bun UI components are copied into your project through the shadcn CLI. Review and adapt them before shipping.",
  contactEmail: "malay77patra@gmail.com",
  issuesUrl: `${REGISTRY_HOMEPAGE}/issues`,
  contactNote: "Found a bug or issue? Open an issue or send a note.",
  license: [
    "Free to use and modify in personal and commercial projects.",
    "Attribution to Bun UI is appreciated when using a component.",
    "Please do not resell the components as your own kit.",
  ],
} as const;

export const components: ComponentItem[] = [
  {
    name: "Vinyl player",
    href: "/components/vinyl-player",
    category: "display",
    isNew: true,
    featured: true,
    registry: "vinyl-player",
    preview: "/recordings/vinyl-player-preview.mp4",
    description:
      "A vinyl-inspired audio player with tactile playback controls.",
    source: `${REGISTRY_HOMEPAGE}/blob/main/components/ui/vinyl-player.tsx`,
    interaction:
      "Press play to drop the arm onto the record and start the spin. Press again to stop the record and park the arm.",
    props: [
      {
        name: "playing",
        type: "boolean",
        description:
          "Play state for controlled usage. Leave it out to let the component manage itself.",
      },
      {
        name: "defaultPlaying",
        type: "boolean",
        default: "false",
        description: "Initial play state when the component is uncontrolled.",
      },
      {
        name: "onPlayingChange",
        type: "(playing: boolean) => void",
        description: "Called whenever the play button changes the play state.",
      },
      {
        name: "disabled",
        type: "boolean",
        default: "false",
        description: "Disables the play control and dims the player.",
      },
      {
        name: "spinDuration",
        type: "number",
        default: "3000",
        description: "Milliseconds for one full record rotation.",
      },
      {
        name: "className",
        type: "string",
        description: "Extra classes merged onto the player root.",
      },
    ],
    usage: `import { VinylPlayer } from "@/components/ui/vinyl-player"

export function Demo() {
  return <VinylPlayer />
}`,
  },
  {
    name: "Streak grid",
    href: "/components/streak-grid",
    category: "display",
    isNew: true,
    featured: true,
    registry: "streak-grid",
    preview: "/recordings/streak-grid-preview.mp4",
    dependencies: [{ name: "tooltip" }],
    description:
      "A yearly activity grid for visualizing streaks and daily progress.",
    source: `${REGISTRY_HOMEPAGE}/blob/main/components/ui/streak-grid.tsx`,
    interaction:
      "Hover or focus a day to inspect it in a tooltip. Click or tap a day to temporarily show its details in the summary for three seconds.",
    props: [
      {
        name: "data",
        type: "StreakGridDay[]",
        required: true,
        description:
          "Daily activity entries with a date, count, and optional label or explicit intensity level.",
      },
      {
        name: "weekStartsOn",
        type: "0 | 1",
        default: "0",
        options: ["0", "1"],
        description:
          "Choose Sunday (0) or Monday (1) as the first day of the week.",
      },
      {
        name: "itemLabel",
        type: "string",
        default: '"activities"',
        description: "Text shown after the total count in the summary.",
      },
      {
        name: "showLegend",
        type: "boolean",
        default: "true",
        description: "Shows the Less-to-More intensity legend.",
      },
      {
        name: "showSummary",
        type: "boolean",
        default: "true",
        description: "Shows the total activity count beneath the grid.",
      },
      {
        name: "showMonthLabels",
        type: "boolean",
        default: "true",
        description: "Shows month labels above multi-week views.",
      },
      {
        name: "cellSize",
        type: "number",
        default: "12",
        description:
          "Cell size in pixels. Values are clamped between 8 and 28.",
      },
      {
        name: "gap",
        type: "number",
        default: "3",
        description:
          "Gap between cells in pixels. Values are clamped between 1 and 12.",
      },
      {
        name: "formatTooltip",
        type: "(day: StreakGridResolvedDay) => React.ReactNode",
        description:
          "Optional custom tooltip renderer for pointer and keyboard users.",
      },
      {
        name: "formatSelection",
        type: "(day: StreakGridResolvedDay) => React.ReactNode",
        description:
          "Optional custom summary content shown for three seconds after clicking or tapping a day.",
      },
      {
        name: "className",
        type: "string",
        description: "Extra classes merged onto the component root.",
      },
    ],
    usage: `import { StreakGrid } from "@/components/ui/streak-grid"
import { TooltipProvider } from "@/components/ui/tooltip"

const activity = [
  { date: "2026-09-01", count: 2 },
  { date: "2026-09-02", count: 6 },
  { date: "2026-09-03", count: 0 },
]

export function Demo() {
  return (
    <TooltipProvider>
      <StreakGrid
        data={activity}
        itemLabel="activities"
        weekStartsOn={1}
      />
    </TooltipProvider>
  )
}`,
  },
  {
    name: "Command menu",
    href: "/components/command-menu",
    category: "navigation",
    isNew: true,
    featured: true,
    registry: "command-menu",
    preview: "/recordings/command-menu-preview.mp4",
    dependencies: [{ name: "dialog" }],
    description:
      "A ⌘K command palette and keyboard shortcut with squeeze effect.",
    source: `${REGISTRY_HOMEPAGE}/blob/main/components/ui/command-menu.tsx`,
    interaction:
      "Hold the modifier and the hotkey to watch the shortcut chips squeeze down like real keys, then release to pop the menu open. Search, arrow up and down to move, Enter to run, Esc to close. Clicking the trigger opens it too.",
    props: [
      {
        name: "items",
        type: "CommandMenuItem[]",
        required: true,
        description:
          "Commands to render. Each item has an id, label, and optional icon, description, shortcut, keywords, group, and onSelect.",
      },
      {
        name: "open",
        type: "boolean",
        description:
          "Open state for controlled usage. Leave it out to let the component manage itself.",
      },
      {
        name: "defaultOpen",
        type: "boolean",
        default: "false",
        description: "Initial open state when the component is uncontrolled.",
      },
      {
        name: "onOpenChange",
        type: "(open: boolean) => void",
        description: "Called whenever the open state changes.",
      },
      {
        name: "onSelect",
        type: "(item: CommandMenuItem) => void",
        description:
          "Called with the chosen item, in addition to the item's own onSelect.",
      },
      {
        name: "hotkey",
        type: "string",
        default: '"k"',
        description:
          "Letter pressed with the modifier (⌘ on macOS, Ctrl elsewhere) to open the menu.",
      },
      {
        name: "placeholder",
        type: "string",
        default: '"Type a command or search…"',
        description: "Placeholder shown inside the search input.",
      },
      {
        name: "triggerPlaceholder",
        type: "string",
        default: '"Search…"',
        description: "Label shown inside the trigger before the shortcut chips.",
      },
      {
        name: "emptyMessage",
        type: "string",
        default: '"No results found."',
        description: "Message shown when no item matches the query.",
      },
      {
        name: "showTrigger",
        type: "boolean",
        default: "true",
        description:
          "Renders the built-in search-style trigger. Set false to open via the hotkey only.",
      },
      {
        name: "className",
        type: "string",
        description: "Extra classes merged onto the trigger.",
      },
    ],
    usage: `import { CommandMenu } from "@/components/ui/command-menu"
import { Home, Settings, User } from "lucide-react"

const items = [
  { id: "home", label: "Go to Dashboard", icon: <Home />, group: "Navigation" },
  { id: "profile", label: "Open Profile", icon: <User />, group: "Navigation" },
  { id: "settings", label: "Settings", icon: <Settings />, shortcut: "⌘," },
]

export function Demo() {
  return <CommandMenu items={items} onSelect={(item) => console.log(item.id)} />
}`,
  },
  {
    name: "Bendy slider",
    href: "/components/bendy-slider",
    category: "inputs",
    isNew: true,
    featured: true,
    registry: "bendy-slider",
    preview: "/recordings/bendy-slider-preview.mp4",
    dependencies: [{ name: "lucide-react" }],
    description:
      "A tactile slider that bends at the edges.",
    creator: {
      handle: "fabiuix",
      url: "https://x.com/fabiuix",
    },
    source: `${REGISTRY_HOMEPAGE}/blob/main/components/ui/bendy-slider.tsx`,
    interaction:
      "Drag the knob or click anywhere on the track. As the knob moves from center towards either edge, it smoothly bends to match the rounded boundary.",
    props: [
      {
        name: "value",
        type: "number",
        description:
          "Controlled slider value between min and max.",
      },
      {
        name: "defaultValue",
        type: "number",
        default: "50",
        description: "Initial value when uncontrolled. Defaults to track center.",
      },
      {
        name: "min",
        type: "number",
        default: "0",
        description: "Minimum slider value.",
      },
      {
        name: "max",
        type: "number",
        default: "100",
        description: "Maximum slider value.",
      },
      {
        name: "step",
        type: "number",
        default: "1",
        description: "Step increment value.",
      },
      {
        name: "onValueChange",
        type: "(value: number) => void",
        description: "Called whenever the slider value changes during dragging or navigation.",
      },
      {
        name: "onValueCommit",
        type: "(value: number) => void",
        description: "Called when dragging ends or keyboard input commits.",
      },
      {
        name: "icon",
        type: "React.ReactNode",
        description: "Leading icon rendered on the left of the slider track.",
      },
      {
        name: "formatValue",
        type: "(value: number) => React.ReactNode",
        description: "Custom formatter for the value/percentage label on the right.",
      },
      {
        name: "size",
        type: '"sm" | "default" | "lg"',
        default: '"default"',
        options: ["sm", "default", "lg"],
        description: "Height and knob sizing scale.",
      },
      {
        name: "maxBend",
        type: "number",
        default: "4.5",
        description: "Maximum curvature displacement in pixels at the edges.",
      },
      {
        name: "disabled",
        type: "boolean",
        default: "false",
        description: "Disables interaction and dims the slider.",
      },
      {
        name: "className",
        type: "string",
        description: "Extra classes merged onto the slider root element.",
      },
    ],
    usage: `import { BendySlider } from "@/components/ui/bendy-slider"

export function Demo() {
  return <BendySlider defaultValue={50} />
}`,
  },
];

export type PackageManager = "npm" | "pnpm" | "yarn" | "bun";

const PM_EXECUTORS: Record<PackageManager, string> = {
  npm: "npx",
  pnpm: "pnpm dlx",
  yarn: "yarn dlx",
  bun: "bunx --bun",
};

export const PACKAGE_MANAGERS = Object.keys(PM_EXECUTORS) as PackageManager[];

export function installCommand(
  item: ComponentItem,
  pm: PackageManager = "npm",
): string | null {
  if (!item.registry) return null;
  return `${PM_EXECUTORS[pm]} shadcn@latest add ${REGISTRY_REPO}/${item.registry}`;
}

export type ComponentSection = {
  id: string;
  label: string;
  items: ComponentItem[];
};

export const gallerySections: ComponentSection[] = [
  {
    id: "new",
    label: "New releases",
    items: components.filter((c) => c.isNew).reverse(),
  },
  ...CATEGORY_ORDER.map((id) => ({
    id,
    label: CATEGORY_LABELS[id],
    items: components.filter((c) => c.category === id),
  })),
].filter((section) => section.items.length > 0);

export function activeComponent(pathname: string): ComponentItem | undefined {
  return components.find((c) => c.href === pathname);
}

export function swatchProp(item?: ComponentItem): ComponentProp | undefined {
  return item?.props?.find((p) => p.control === "swatch" && p.optionColors);
}

export function cleanDefault(prop?: ComponentProp): string | undefined {
  return prop?.default?.replace(/^["']|["']$/g, "");
}
