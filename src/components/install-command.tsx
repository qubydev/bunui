"use client";

import {Check, Copy} from "lucide-react";
import {useMemo, useState} from "react";

import {Button} from "@/components/ui/button";

const managers = [
  {name: "npm", command: (item: string) => `npx shadcn@latest add ${item}`},
  {name: "pnpm", command: (item: string) => `pnpm dlx shadcn@latest add ${item}`},
  {name: "bun", command: (item: string) => `bunx shadcn@latest add ${item}`},
  {name: "yarn", command: (item: string) => `yarn dlx shadcn@latest add ${item}`},
] as const;

export function InstallCommand({item}: {item: string}) {
  const [active, setActive] = useState<(typeof managers)[number]["name"]>("bun");
  const [copied, setCopied] = useState(false);
  const selected = managers.find((manager) => manager.name === active) ?? managers[0];
  const command = useMemo(() => selected.command(item), [item, selected]);

  async function copyCommand() {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  }

  return (
    <div className="my-5 overflow-hidden rounded-lg border bg-background">
      <div className="flex items-center gap-3 border-b px-3 py-2">
        <div className="flex flex-wrap items-center gap-1">
          {managers.map((manager) => (
            <button
              key={manager.name}
              type="button"
              className={`h-8 rounded-md px-2.5 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground ${
                active === manager.name ? "bg-muted text-foreground" : "text-muted-foreground"
              }`}
              onClick={() => setActive(manager.name)}
            >
              {manager.name}
            </button>
          ))}
        </div>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="ml-auto size-8"
          aria-label={copied ? "Copied command" : "Copy command"}
          onClick={copyCommand}
        >
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
        </Button>
      </div>
      <pre className="overflow-x-auto bg-muted/40 p-4 text-sm">
        <code>{command}</code>
      </pre>
    </div>
  );
}
