import type {TOCItemType} from "fumadocs-core/toc";
import type {ComponentProps, ReactNode} from "react";

import {TOCProvider, TOCScrollArea} from "fumadocs-ui/components/toc";
import {Text} from "@/components/fumadocs/ui/icons";
import {cn} from "@/utils/cn";
import {TOCItems} from "./toc-items";

export interface DocsPageProps {
  toc?: TOCItemType[];
  children?: ReactNode;
}

export function DocsPage({children, toc = []}: DocsPageProps) {
  const content = (
    <>
      <article
        id="nd-page"
        className="flex flex-col gap-4 px-4 py-6 [grid-area:main] *:max-w-[900px] md:px-6 md:pt-8 xl:px-8 xl:pt-14"
      >
        {children}
      </article>

      {toc.length > 0 && (
        <div
          className="xl:layout:[--fd-toc-width:268px] sticky top-(--fd-docs-row-3) flex h-[calc(var(--fd-docs-height)-var(--fd-docs-row-3))] w-(--fd-toc-width) flex-col pe-4 pt-12 pb-2 [grid-area:toc] max-xl:hidden"
          id="nd-toc"
        >
          <h3 className="text-fd-muted-foreground inline-flex items-center gap-1.5 text-sm" id="toc-title">
            <Text className="size-4" />
            On this page
          </h3>
          <TOCScrollArea><TOCItems /></TOCScrollArea>
        </div>
      )}
    </>
  );

  return toc.length > 0 ? <TOCProvider toc={toc}>{content}</TOCProvider> : content;
}

export function DocsBody({children, className, ...props}: ComponentProps<"div">) {
  return <div {...props} className={cn("prose flex-1", className)}>{children}</div>;
}

export function DocsDescription({children, className, ...props}: ComponentProps<"p">) {
  if (children === undefined) return null;
  return <p {...props} className={cn("text-fd-muted-foreground mb-8 text-lg", className)}>{children}</p>;
}

export function DocsTitle({children, className, ...props}: ComponentProps<"h1">) {
  return <h1 {...props} className={cn("text-[1.75em] font-semibold", className)}>{children}</h1>;
}
