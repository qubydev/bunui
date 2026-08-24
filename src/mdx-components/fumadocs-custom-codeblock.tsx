"use client";

import type {CodeBlockProps} from "fumadocs-ui/components/codeblock";
import type {ComponentProps, RefObject} from "react";
import {Check, Copy} from "@gravity-ui/icons";
import {buttonVariants} from "@/registry/default/ui/button";
import {CodeBlock} from "fumadocs-ui/components/codeblock";
import {useCopyButton} from "fumadocs-ui/utils/use-copy-button";
import {useRef} from "react";
import {cn} from "@/utils/cn";

export function FumadocsCustomCodeblock({allowCopy = true, children, code, ...props}: {children: React.ReactNode; code?: string} & CodeBlockProps) {
  const areaRef = useRef<HTMLDivElement>(null);
  return (
    <CodeBlock
      {...props}
      allowCopy={allowCopy}
      // @ts-expect-error fumadocs viewport ref type
      viewportProps={{ref: areaRef}}
      Actions={({className: _className, ...actionsProps}) => (
        <div {...actionsProps} className="absolute top-2.5 right-2.5 z-10 flex empty:hidden">
          {!!allowCopy && <CopyButton code={code} containerRef={areaRef} />}
        </div>
      )}
    >
      {children}
    </CodeBlock>
  );
}

function CopyButton({className, code, containerRef, ...props}: ComponentProps<"button"> & {code?: string; containerRef: RefObject<HTMLElement | null>}) {
  const [checked, onClick] = useCopyButton(() => {
    if (code) {
      void navigator.clipboard.writeText(code);
      return;
    }
    const pre = containerRef.current?.getElementsByTagName("pre").item(0);
    if (!pre) return;
    const clone = pre.cloneNode(true) as HTMLElement;
    clone.querySelectorAll(".nd-copy-ignore").forEach((node) => node.replaceWith("\n"));
    void navigator.clipboard.writeText(clone.textContent ?? "");
  });

  return (
    <button aria-label={checked ? "Copied Text" : "Copy Text"} data-checked={checked || undefined} type="button"
      className={buttonVariants({class: cn("-mt-0.5 text-muted", className), isIconOnly:true, size:"sm", variant:"transparent"})}
      onClick={onClick} {...props}>
      {checked ? <Check className="size-4" /> : <Copy className="size-4" />}
    </button>
  );
}
