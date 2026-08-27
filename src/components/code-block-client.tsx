"use client";

import {Check, Copy} from "lucide-react";
import {type ReactNode, useState} from "react";

import {Button} from "@/components/ui/button";

export function CodeBlockClient({
  code,
  collapsible,
  label,
  flushTop,
  children,
}: {
  children: ReactNode;
  code: string;
  collapsible: boolean;
  label?: string;
  flushTop: boolean;
}) {
  const [copied, setCopied] = useState(false);
  const [collapsed, setCollapsed] = useState(collapsible);

  async function copyCode() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  }

  return (
    <div className={`not-prose relative overflow-hidden bg-background ${flushTop ? "rounded-b-lg" : "rounded-lg border"}`}>
      {label ? (
        <div className="flex h-10 items-center border-b px-4 text-sm text-muted-foreground">
          <span className="truncate">{label}</span>
        </div>
      ) : null}

      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="absolute right-2 top-1 size-8"
        aria-label={copied ? "Copied code" : "Copy code"}
        onClick={copyCode}
      >
        {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
      </Button>

      <div className={`relative ${collapsed ? "max-h-48 overflow-hidden" : ""}`}>
        <div className="overflow-x-auto rounded-none! border-0! bg-muted/25 pt-4 pb-16 text-sm leading-6 shadow-none! [&_code]:m-0 [&_code]:block [&_code]:min-w-max [&_code]:border-0! [&_code]:bg-transparent! [&_code]:p-0 [&_code]:font-mono [&_code]:shadow-none! [&_pre]:m-0 [&_pre]:block [&_pre]:min-w-max [&_pre]:border-0! [&_pre]:bg-transparent! [&_pre]:p-0 [&_pre]:font-mono [&_pre]:shadow-none!">
          <pre>
            <code>{children}</code>
          </pre>
        </div>
        {collapsed ? (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-background/0 to-background" />
        ) : null}

        {collapsible ? (
          <div className="absolute inset-x-0 bottom-3 z-10 flex justify-center">
            <Button type="button" variant="secondary" size="sm" onClick={() => setCollapsed((value) => !value)}>
              {collapsed ? "Expand code" : "Collapse code"}
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
