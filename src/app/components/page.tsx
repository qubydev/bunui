import Link from "next/link";
import {DocsBody, DocsDescription, DocsPage, DocsTitle} from "fumadocs-ui/layouts/notebook/page";

import {Button} from "@/components/ui/button";

const toc = [{title: "Buttons", url: "#buttons", depth: 2}];

export default function ComponentsPage() {
  return (
    <DocsPage toc={toc} footer={{enabled: false}} tableOfContentPopover={{enabled: false}}>
      <section className="flex flex-col gap-2">
        <DocsTitle>All Components</DocsTitle>
        <DocsDescription className="text-md mt-2 mb-4">
          Explore the full list of components available in the library. More are on the way.
        </DocsDescription>
      </section>

      <DocsBody className="prose-sm">
        <h2 id="buttons">Buttons</h2>
        <div className="not-prose flex flex-col gap-12">
          <div className="grid grid-cols-1 gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col gap-2">
              <div className="order-2">
                <Link className="text-sm font-medium text-foreground hover:underline" href="/components/button">
                  Button
                </Link>
              </div>
              <Link
                href="/components/button"
                className="order-1 flex aspect-[3/2] items-center justify-center overflow-hidden rounded-lg border bg-background p-5 transition-colors hover:bg-muted/40"
              >
                <Button>Button</Button>
              </Link>
            </div>
          </div>
        </div>
      </DocsBody>
    </DocsPage>
  );
}
