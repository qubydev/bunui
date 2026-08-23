"use client";

import {Check, Copy} from "@gravity-ui/icons";
import {useMemo, useState} from "react";

import {Button} from "@/registry/default/ui/button";
import {cn} from "@/utils/cn";

const managers = [
  {name: "pnpm", command: (item: string) => `pnpm dlx shadcn@latest add ${item}`},
  {name: "npm", command: (item: string) => `npx shadcn@latest add ${item}`},
  {name: "yarn", command: (item: string) => `yarn dlx shadcn@latest add ${item}`},
  {name: "bun", command: (item: string) => `bunx shadcn@latest add ${item}`},
] as const;

interface InstallCommandProps {
  item: string;
  className?: string;
}

export function InstallCommand({className, item}: InstallCommandProps) {
  const [active, setActive] = useState<(typeof managers)[number]["name"]>("pnpm");
  const [copied, setCopied] = useState(false);
  const selected = managers.find((manager) => manager.name === active) ?? managers[0];
  const command = useMemo(() => selected.command(item), [item, selected]);

  const copyCommand = async () => {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div
      className={cn(
        "not-prose my-5 overflow-hidden rounded-xl border border-separator bg-background-secondary",
        className,
      )}
    >
      <div className="flex items-center gap-1 border-b border-separator px-2 py-2">
        {managers.map((manager) => (
          <button
            key={manager.name}
            className={cn(
              "rounded-lg px-3 py-1.5 text-sm font-medium text-muted transition-colors",
              "hover:text-foreground",
              active === manager.name && "bg-background-tertiary text-foreground shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--foreground)_7%,transparent)]",
            )}
            type="button"
            onClick={() => setActive(manager.name)}
          >
            {manager.name}
          </button>
        ))}
      </div>
      <div className="flex min-w-0 items-center gap-3 px-4 py-4">
        <code className="min-w-0 flex-1 overflow-x-auto border-none bg-transparent p-0 font-mono text-[13px] text-foreground">
          {command}
        </code>
        <Button
          aria-label={copied ? "Copied command" : "Copy command"}
          className="shrink-0 text-muted [--button-bg:transparent] [--button-bg-hover:transparent] [--button-fg:var(--muted)] hover:text-foreground"
          isIconOnly
          size="sm"
          type="button"
          variant="ghost"
          onPress={copyCommand}
        >
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
        </Button>
      </div>
    </div>
  );
}
