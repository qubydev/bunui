import path from "node:path";
import type {CSSProperties} from "react";

import {codeToTokens} from "shiki";

import {CodeBlockClient} from "@/components/code-block-client";

function getLanguage(title?: string) {
  const extension = title?.split(".").pop();

  if (extension === "tsx" || extension === "ts" || extension === "jsx" || extension === "js" || extension === "css") {
    return extension;
  }

  return "text";
}

function getTokenStyle(style: CSSProperties) {
  const tokenStyle = {...style} as CSSProperties & {
    "--shiki-light"?: string;
    "--shiki-dark"?: string;
  };

  tokenStyle["--shiki-light"] =
    typeof style.color === "string" ? style.color : undefined;
  delete tokenStyle.color;

  return tokenStyle;
}

export async function CodeBlock({
  code,
  collapsible = true,
  flushTop = false,
  title,
}: {
  code: string;
  collapsible?: boolean;
  flushTop?: boolean;
  title?: string;
}) {
  const trimmedCode = code
    .trim()
    .split("\n")
    .filter((line) => line.trim().length > 0)
    .join("\n");
  const filename = title ? path.basename(title) : undefined;
  const {tokens} = await codeToTokens(trimmedCode, {
    lang: getLanguage(title),
    themes: {
      dark: "github-dark",
      light: "github-light",
    },
  });

  return (
    <CodeBlockClient code={trimmedCode} collapsible={collapsible} filename={filename} flushTop={flushTop}>
      {tokens.map((line, lineIndex) => (
        <span className="flex min-h-6 whitespace-pre pr-4" key={lineIndex}>
          <span className="w-10 shrink-0 select-none pr-4 text-right text-muted-foreground/45">{lineIndex + 1}</span>
          <span className="min-w-0">
            {line.length > 0
              ? line.map((token, tokenIndex) => (
                  <span
                    className="text-[var(--shiki-light)] dark:text-[var(--shiki-dark)]"
                    key={tokenIndex}
                    style={getTokenStyle(token.htmlStyle as CSSProperties)}
                  >
                    {token.content}
                  </span>
                ))
              : " "}
          </span>
        </span>
      ))}
    </CodeBlockClient>
  );
}
