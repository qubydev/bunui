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
        <span className="bunui-code-line" key={lineIndex}>
          <span className="bunui-code-line-number">{lineIndex + 1}</span>
          <span className="bunui-code-line-content">
            {line.length > 0
              ? line.map((token, tokenIndex) => (
                  <span className="bunui-code-token" key={tokenIndex} style={token.htmlStyle as CSSProperties}>
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
