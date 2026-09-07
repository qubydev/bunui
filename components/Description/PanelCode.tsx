"use client";

import { Highlight, themes } from "prism-react-renderer";
import { useTheme } from "next-themes";
import { useIsMobile } from "@/lib/use-media-query";
import { cn } from "@/lib/utils";

type PanelCodeProps = {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  className?: string;
};

export default function PanelCode({
  code,
  language = "tsx",
  showLineNumbers = false,
  className,
}: PanelCodeProps) {
  const isMobile = useIsMobile();
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme === "dark" ? themes.oneDark : themes.github;

  return (
    <div
      className={cn(
        "flex overflow-hidden",
        !isMobile && "rounded-xl bg-muted p-3",
        className,
        isMobile && "p-0",
      )}
    >
      <Highlight theme={theme} code={code} language={language}>
        {({ className: prismClassName, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            data-language={language}
            className={cn(
              prismClassName,
              "min-h-0 w-full flex-1 overflow-auto rounded-lg p-4 font-mono text-xs leading-6",
              isMobile && "rounded-xl border border-border",
            )}
            style={{ ...style, margin: 0, background: "var(--background)" }}
          >
            {tokens.map((line, index) => (
              <div key={index} {...getLineProps({ line })}>
                {showLineNumbers && (
                  <span className="mr-4 inline-block w-5 select-none text-right text-muted-foreground/60">
                    {index + 1}
                  </span>
                )}
                {line.map((token, tokenIndex) => (
                  <span key={tokenIndex} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
}
