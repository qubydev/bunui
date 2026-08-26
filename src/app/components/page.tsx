import Link from "next/link";
import {DocsBody, DocsDescription, DocsPage, DocsTitle} from "fumadocs-ui/layouts/notebook/page";

import {Button} from "@/components/ui/button";

export default function ComponentsPage() {
  return (
    <DocsPage
      toc={[]}
      footer={{enabled: false}}
      tableOfContent={{enabled: false}}
      tableOfContentPopover={{enabled: false}}
    >
      <DocsTitle>All Components</DocsTitle>
      <DocsDescription>
        Explore the full list of components available in the library. More are on the way.
      </DocsDescription>

      <DocsBody>
        <div className="not-prose grid grid-cols-1 gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          <article className="flex flex-col gap-2">
            <Link
              href="/components/button"
              className="order-1 flex aspect-[3/2] items-center justify-center overflow-hidden rounded-lg border bg-background p-5 transition-colors hover:bg-muted/40"
            >
              <Button>Button</Button>
            </Link>
            <h2 className="order-2 m-0 text-sm font-medium">
              <Link className="text-foreground no-underline hover:underline" href="/components/button">
                Button
              </Link>
            </h2>
          </article>
        </div>
      </DocsBody>
    </DocsPage>
  );
}
