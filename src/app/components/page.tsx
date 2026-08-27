import Link from "next/link";
import {DocsBody, DocsDescription, DocsPage, DocsTitle} from "fumadocs-ui/layouts/notebook/page";

const components = [
  {name: "Button", href: "/components/button"},
  {name: "Input", href: "/components/input"},
];

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
        <div className="not-prose grid max-w-xl grid-cols-1 gap-x-10 gap-y-4 sm:grid-cols-2">
          {components.map((component) => (
            <Link
              key={component.href}
              href={component.href}
              className="text-base font-medium text-foreground no-underline underline-offset-4 hover:underline"
            >
              {component.name}
            </Link>
          ))}
        </div>
      </DocsBody>
    </DocsPage>
  );
}
