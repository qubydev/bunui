"use client";

import {Check, Copy} from "lucide-react";
import {useState} from "react";

import {Button} from "@/components/ui/button";

export function CodeBlock({code, title}: {code: string; title?: string}) {
  const [copied, setCopied] = useState(false);

  async function copyCode() {
    await navigator.clipboard.writeText(code.trim());
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  }

  return (
    <div className="relative overflow-hidden rounded-lg border bg-background">
      {title ? (
        <div className="flex h-10 items-center border-b px-4 text-sm text-muted-foreground">
          {title}
        </div>
      ) : null}
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="absolute right-2 top-2 size-8"
        aria-label={copied ? "Copied code" : "Copy code"}
        onClick={copyCode}
      >
        {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
      </Button>
      <pre className="overflow-x-auto bg-muted/40 p-4 pr-12 text-sm leading-6">
        <code>{code.trim()}</code>
      </pre>
    </div>
  );
}
