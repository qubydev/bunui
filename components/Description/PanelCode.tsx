"use client";

import { Highlight, themes } from "prism-react-renderer";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

type PanelCodeProps = {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  className?: string;
  contentClassName?: string;
};

export default function PanelCode({
  code,
  language = "tsx",
  showLineNumbers = false,
  className,
  contentClassName,
}: PanelCodeProps) {
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme === "dark" ? themes.oneDark : themes.github;

  return (
    <div
      className={cn("flex overflow-hidden", className)}
    >
      <Highlight theme={theme} code={code} language={language}>
        {({ className: prismClassName, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            data-language={language}
            className={cn(
              prismClassName,
              "min-h-0 w-full flex-1 overflow-auto p-4 font-mono text-xs leading-6",
              contentClassName,
            )}
            style={{ ...style, margin: 0, background: "transparent" }}
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
