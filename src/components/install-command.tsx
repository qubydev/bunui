"use client";

import {Check, Copy} from "lucide-react";
import {useMemo, useState} from "react";

import {buttonVariants} from "@/registry/default/ui/button";
import {cn} from "@/utils/cn";

const managers = [
  {name: "npm", command: (item: string) => `npx shadcn@latest add ${item}`},
  {name: "pnpm", command: (item: string) => `pnpm dlx shadcn@latest add ${item}`},
  {name: "bun", command: (item: string) => `bunx shadcn@latest add ${item}`},
  {name: "yarn", command: (item: string) => `yarn dlx shadcn@latest add ${item}`},
] as const;

interface InstallCommandProps {
  item: string;
  className?: string;
}

export function InstallCommand({className, item}: InstallCommandProps) {
  const [active, setActive] = useState<(typeof managers)[number]["name"]>("npm");
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
        "install-command not-prose my-5 overflow-hidden rounded-xl border border-separator",
        className,
      )}
    >
      <div className="flex items-center gap-3 border-b border-separator px-4 py-3">
        <div className="install-command-tabs flex w-fit flex-wrap items-center gap-1">
          {managers.map((manager) => (
            <button
              key={manager.name}
              className={cn(
                "flex h-8 items-center gap-1.5 rounded-md px-2.5 text-sm font-medium text-muted transition-colors",
                "hover:text-foreground",
                active === manager.name && "is-active text-foreground",
              )}
              type="button"
              onClick={() => setActive(manager.name)}
            >
              {manager.name}
            </button>
          ))}
        </div>
        <button
          aria-label={copied ? "Copied command" : "Copy command"}
          className={buttonVariants({class: "ml-auto shrink-0 text-muted", isIconOnly:true, size:"sm", variant:"ghost"})}
          type="button"
          onClick={copyCommand}
        >
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
        </button>
      </div>
      <div className="bg-(--docs-code-surface) overflow-x-auto px-4 py-4">
        <code className="block w-max min-w-full whitespace-nowrap border-none bg-transparent px-2 py-1 font-mono text-[0.8125rem] leading-6 text-foreground">
          {command}
        </code>
      </div>
    </div>
  );
}





