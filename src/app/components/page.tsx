import Link from "next/link";
import {DocsBody, DocsDescription, DocsPage, DocsTitle} from "@/components/fumadocs/layouts/notebook/page";

const toc=[{title:"Buttons",url:"#buttons",depth:2}] as any;

export default function ComponentsPage(){
  return <DocsPage toc={toc}>
    <section className="flex flex-col gap-2">
      <DocsTitle>All Components</DocsTitle>
      <DocsDescription className="text-md mt-2 mb-4">Explore the full list of components available in the library. More are on the way.</DocsDescription>
    </section>
    <DocsBody className="prose-sm">
      <h2 id="buttons">Buttons</h2>
      <div className="not-prose flex flex-col gap-12">
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col gap-[9px]">
              <div className="order-1 sm:order-2">
                <Link className="link no-underline" href="/components/button">Button</Link>
              </div>
              <div className="relative order-2 aspect-square overflow-hidden rounded-xl border border-separator sm:order-1">
                <Link className="block h-full w-full" href="/components/button">
                  <img
                    alt="Button component preview"
                    className="h-full w-full object-cover"
                    src="/previews/button.png"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DocsBody>
  </DocsPage>;
}
