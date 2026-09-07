"use client";

import { useIsMobile } from "@/lib/use-media-query";
import { cn } from "@/lib/utils";

type PanelCodeProps = {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  className?: string;
};

// shared code surface for the panel + drawer
export default function PanelCode({
  code,
  language = "tsx",
  showLineNumbers = false,
  className,
}: PanelCodeProps) {
  const isMobile = useIsMobile();

  return (
    <div
      className={cn(
        "flex overflow-hidden",
        !isMobile && "rounded-xl bg-muted p-3",
        className,
        isMobile && "p-0",
      )}
    >
      <pre
        data-language={language}
        className={cn(
          "min-h-0 w-full flex-1 overflow-auto rounded-lg bg-background p-4 font-mono text-xs leading-6 text-foreground",
          isMobile && "rounded-xl border border-border",
        )}
      >
        <code>
          {showLineNumbers
            ? code
                .split("\n")
                .map(
                  (line, index) =>
                    `${String(index + 1).padStart(2, " ")}  ${line}`,
                )
                .join("\n")
            : code}
        </code>
      </pre>
    </div>
  );
}
