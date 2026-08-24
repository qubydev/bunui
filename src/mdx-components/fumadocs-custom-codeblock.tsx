"use client";

import type {CodeBlockProps} from "fumadocs-ui/components/codeblock";
import type {CSSProperties, ComponentProps, RefObject} from "react";
import {Check, Copy} from "lucide-react";
import {buttonVariants} from "@/registry/default/ui/button";
import {useCopyButton} from "fumadocs-ui/utils/use-copy-button";
import {useRef} from "react";
import {cn} from "@/utils/cn";

type CodeBlockViewportStyle = CSSProperties & {
  "--padding-right"?: string;
};

export function FumadocsCustomCodeblock({
  allowCopy = true,
  children,
  className,
  code,
  icon,
  keepBackground,
  title,
  viewportProps,
  ...props
}: {children: React.ReactNode; code?: string} & CodeBlockProps) {
  const areaRef = useRef<HTMLDivElement>(null);
  const {className: viewportClassName, style: viewportStyle, ...restViewportProps} = viewportProps ?? {};

  return (
    <div className="relative overflow-hidden rounded-b-xl">
      <figure
        {...props}
        className={cn(
          "shiki relative border shadow-sm not-prose text-sm",
          keepBackground && "bg-(--shiki-light-bg) dark:bg-(--shiki-dark-bg)",
          className,
        )}
        dir="ltr"
        tabIndex={-1}
      >
        {title ? (
          <div className="flex h-9.5 items-center gap-2 border-b px-4 text-fd-muted-foreground">
            {typeof icon === "string" ? (
              <div
                className="[&_svg]:size-3.5"
                dangerouslySetInnerHTML={{__html: icon}}
              />
            ) : (
              icon
            )}
            <figcaption className="flex-1 truncate">{title}</figcaption>
          </div>
        ) : null}
        <div
          {...restViewportProps}
          ref={areaRef}
          className={cn(
            "docs-code-block-viewport fd-scroll-container focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-fd-ring",
            viewportClassName,
          )}
          role="region"
          style={{
            "--padding-right": !title ? "calc(var(--spacing) * 8)" : undefined,
            counterSet: props["data-line-numbers"] ? `line ${Number(props["data-line-numbers-start"] ?? 1) - 1}` : undefined,
            ...viewportStyle,
          } as CodeBlockViewportStyle}
          tabIndex={0}
        >
          {children}
        </div>
      </figure>
      {allowCopy ? (
        <div className={cn("absolute right-2.5 z-10 flex", title ? "top-1.5" : "top-2.5")}>
          <CopyButton code={code} containerRef={areaRef} />
        </div>
      ) : null}
    </div>
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
      className={buttonVariants({class: cn("-mt-0.5 text-muted", className), isIconOnly:true, size:"sm", variant:"ghost"})}
      onClick={onClick} {...props}>
      {checked ? <Check className="size-4" /> : <Copy className="size-4" />}
    </button>
  );
}





