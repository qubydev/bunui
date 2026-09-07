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

export type ComponentItem = {
  name: string;
  href: string;
  category: ComponentCategory;
  isNew?: boolean;
  description?: string;
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
  contactEmail: "maay77patra@gmail.com",
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
      "A compact music player built around a detailed vinyl record and tonearm.",
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
