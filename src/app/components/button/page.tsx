import {Button} from "@bunui/react";
import {DocsBody, DocsDescription, DocsPage, DocsTitle} from "@/components/fumadocs/layouts/notebook/page";

const toc=[{title:"Preview",url:"#preview",depth:2},{title:"Usage",url:"#usage",depth:2}] as any;

export default function ButtonPage(){
  return <DocsPage toc={toc} breadcrumb={{enabled:false}} footer={{enabled:false}}>
    <section className="flex flex-col gap-2">
      <DocsTitle>Button</DocsTitle>
      <DocsDescription className="text-md mt-2 mb-4">Displays a button or a component that looks like a button.</DocsDescription>
    </section>
    <DocsBody className="prose-sm">
      <h2 id="preview">Preview</h2>
      <div className="component-preview-container group relative my-4 w-full">
        <div className="preview not-prose relative flex min-h-[350px] w-full items-center justify-center overflow-hidden rounded-xl border border-separator p-4 sm:p-10">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button>Button</Button><Button variant="secondary">Secondary</Button><Button variant="outline">Outline</Button><Button variant="ghost">Ghost</Button><Button variant="danger">Danger</Button>
          </div>
        </div>
      </div>
      <h2 id="usage">Usage</h2>
      <pre className="docs-code-block"><code>{`import { Button } from "@bunui/react";\n\n<Button>Button</Button>`}</code></pre>
    </DocsBody>
  </DocsPage>;
}