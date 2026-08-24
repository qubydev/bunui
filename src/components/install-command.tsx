"use client";

import {Check, Copy, Terminal} from "@gravity-ui/icons";
import {useMemo, useState} from "react";

import {buttonVariants} from "@/registry/default/ui/button";
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
        "install-command not-prose my-5 overflow-hidden rounded-xl border border-separator bg-transparent",
        className,
      )}
    >
      <div className="border-b border-separator px-3 py-3">
        <div className="install-command-tabs flex w-fit flex-wrap items-center gap-1">
          <Terminal className="mr-2 size-4.5 shrink-0 text-muted" />
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
      </div>
      <div className="flex min-w-0 items-center gap-3 px-3 py-3">
        <div className="install-command-line flex min-w-0 flex-1 items-center overflow-hidden px-3 py-2.5">
          <code className="block min-w-0 flex-1 overflow-x-auto whitespace-nowrap border-none bg-transparent p-0 font-mono text-[13px] leading-6 text-foreground">
            {command}
          </code>
        </div>
        <button
          aria-label={copied ? "Copied command" : "Copy command"}
          className={buttonVariants({class: "shrink-0 text-muted", isIconOnly:true, size:"sm", variant:"transparent"})}
          type="button"
          onClick={copyCommand}
        >
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
        </button>
      </div>
    </div>
  );
}
