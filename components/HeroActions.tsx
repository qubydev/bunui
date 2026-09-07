"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/Button";

const INSTALL_COMMAND = "npx shadcn@latest add qubydev/bunui/<component>";

export default function HeroActions() {
  const [copied, setCopied] = useState(false);
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    };
  }, []);

  const copyCommand = async () => {
    try {
      await navigator.clipboard.writeText(INSTALL_COMMAND);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = INSTALL_COMMAND;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      document.execCommand("copy");
      textarea.remove();
    }

    setCopied(true);
    if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    resetTimerRef.current = setTimeout(() => setCopied(false), 1400);
  };

  return (
    <div className="mt-7 flex min-w-0 flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-nowrap">
      <Button href="/components" size="lg" className="w-full sm:w-auto sm:shrink-0">Get started</Button>
      <Button
        variant="secondary"
        size="lg"
        onClick={copyCommand}
        aria-label={`Copy install command: ${INSTALL_COMMAND}`}
        className="w-full min-w-0 justify-between gap-3 px-4 font-medium sm:w-auto sm:flex-none sm:gap-4 sm:px-5"
      >
        <span className="min-w-0 truncate text-left text-xs sm:text-sm">{INSTALL_COMMAND}</span>
        {copied ? (
          <Check className="h-4 w-4 shrink-0" aria-hidden="true" />
        ) : (
          <Copy className="h-4 w-4 shrink-0" aria-hidden="true" />
        )}
      </Button>
    </div>
  );
}
