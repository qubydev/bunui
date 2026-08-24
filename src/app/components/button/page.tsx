import {CodeBlock} from "@/components/codeblock";
import {ComponentPreview} from "@/components/component-preview";
import {DocsBody, DocsDescription, DocsPage, DocsTitle} from "@/components/fumadocs/layouts/notebook/page";
import {InstallCommand} from "@/components/install-command";
import {registryItemUrl} from "@/config/site";

const toc = [
  {title:"Installation",url:"#installation",depth:2},
  {title:"Examples",url:"#examples",depth:2},
  {title:"Variants",url:"#variants",depth:3},
  {title:"Sizes",url:"#sizes",depth:3},
  {title:"With Icons",url:"#with-icons",depth:3},
  {title:"Icon Only",url:"#icon-only",depth:3},
  {title:"Disabled State",url:"#disabled-state",depth:3},
  {title:"Customization",url:"#customization",depth:2},
  {title:"API Reference",url:"#api-reference",depth:2},
] as any;

export default function ButtonPage() {
  return (
    <DocsPage toc={toc}>
      <section className="flex flex-col gap-2">
        <DocsTitle>Button</DocsTitle>
        <DocsDescription className="text-md mt-2 mb-4">
          A clickable button component with multiple variants and states.
        </DocsDescription>
      </section>

      <DocsBody className="prose-sm">
        <ComponentPreview name="button-basic" />

        <h2 id="installation">Installation</h2>
        <InstallCommand item={registryItemUrl("button")} />

        <h2 id="examples">Examples</h2>

        <h3 id="variants">Variants</h3>
        <ComponentPreview name="button-variants" />

        <h3 id="sizes">Sizes</h3>
        <ComponentPreview name="button-sizes" />

        <h3 id="with-icons">With Icons</h3>
        <ComponentPreview name="button-with-icons" />

        <h3 id="icon-only">Icon Only</h3>
        <ComponentPreview name="button-icon-only" />

        <h3 id="disabled-state">Disabled State</h3>
        <ComponentPreview name="button-disabled" />

        <h2 id="customization">Customization</h2>
        <p>
          Use the built-in props for common styles, then pass <code>className</code> for one-off customization.
        </p>
        <div className="code-section relative rounded-xl border border-separator bg-transparent">
          <CodeBlock
            code={'<Button variant="outline" size="lg" className="rounded-xl px-8">\n  Get started\n</Button>'}
            className="rounded-xl shadow-none"
            isEmbedded
            lang="tsx"
            showLineNumbers
            title={undefined}
          />
        </div>

        <h2 id="api-reference">API Reference</h2>
        <h3>Button</h3>
        <div className="not-prose my-4 overflow-x-auto rounded-xl border border-separator">
          <table className="w-full min-w-[47.5rem] border-collapse text-left text-sm">
            <thead className="bg-default/60">
              <tr><th className="p-3">Prop</th><th className="p-3">Type</th><th className="p-3">Default</th><th className="p-3">Description</th></tr>
            </thead>
            <tbody className="divide-y divide-separator">
              <tr><td className="p-3"><code>variant</code></td><td className="p-3">primary | secondary | outline | ghost | success | success-soft | danger | danger-soft</td><td className="p-3">primary</td><td className="p-3">Visual style variant</td></tr>
              <tr><td className="p-3"><code>size</code></td><td className="p-3">sm | md | lg</td><td className="p-3">md</td><td className="p-3">Size of the button</td></tr>
              <tr><td className="p-3"><code>disabled</code></td><td className="p-3">boolean</td><td className="p-3">false</td><td className="p-3">Whether the button is disabled</td></tr>
              <tr><td className="p-3"><code>isIconOnly</code></td><td className="p-3">boolean</td><td className="p-3">false</td><td className="p-3">Whether the button contains only an icon</td></tr>
              <tr><td className="p-3"><code>className</code></td><td className="p-3">string</td><td className="p-3">-</td><td className="p-3">Custom classes applied to the button</td></tr>
              <tr><td className="p-3"><code>onClick</code></td><td className="p-3">MouseEventHandler&lt;HTMLButtonElement&gt;</td><td className="p-3">-</td><td className="p-3">Handler called when the button is clicked</td></tr>
              <tr><td className="p-3"><code>children</code></td><td className="p-3">ReactNode</td><td className="p-3">-</td><td className="p-3">Button content</td></tr>
            </tbody>
          </table>
        </div>
      </DocsBody>
    </DocsPage>
  );
}
