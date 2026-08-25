import {DocsBody, DocsDescription, DocsPage, DocsTitle} from "fumadocs-ui/layouts/notebook/page";

import {CodeBlock} from "@/components/code-block";
import {ComponentPreview} from "@/components/component-preview";
import {InstallCommand} from "@/components/install-command";

const toc = [
  {title: "Installation", url: "#installation", depth: 2},
  {title: "Variants", url: "#variants", depth: 2},
  {title: "Sizes", url: "#sizes", depth: 2},
  {title: "With Icons", url: "#with-icons", depth: 2},
  {title: "Icon Only", url: "#icon-only", depth: 2},
  {title: "Disabled State", url: "#disabled-state", depth: 2},
  {title: "Customization", url: "#customization", depth: 2},
  {title: "API Reference", url: "#api-reference", depth: 2},
];

function ApiTable() {
  const props = [
    {
      name: "variant",
      type: "default | primary | secondary | outline | ghost | link | success | success-soft | danger | danger-soft | destructive",
      defaultValue: "default",
      description: "Controls the visual style.",
    },
    {
      name: "size",
      type: "default | xs | sm | md | lg | icon | icon-xs | icon-sm | icon-lg",
      defaultValue: "default",
      description: "Controls button height, padding, text size, and icon-only dimensions.",
    },
    {
      name: "isIconOnly",
      type: "boolean",
      defaultValue: "false",
      description: "Applies fixed square sizing for icon-only buttons.",
    },
    {
      name: "className",
      type: "string",
      defaultValue: "-",
      description: "Adds custom classes to the button.",
    },
  ];

  return (
    <div className="not-prose my-4 overflow-x-auto rounded-lg border">
      <table className="w-full min-w-[47.5rem] border-collapse text-left text-sm">
        <thead className="bg-muted/60 text-foreground">
          <tr>
            <th className="p-3 font-medium">Prop</th>
            <th className="p-3 font-medium">Type</th>
            <th className="p-3 font-medium">Default</th>
            <th className="p-3 font-medium">Description</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {props.map((prop) => (
            <tr key={prop.name}>
              <td className="p-3">
                <code className="bunui-inline-code">{prop.name}</code>
              </td>
              <td className="p-3 leading-6">
                <code className="bunui-inline-code">{prop.type}</code>
              </td>
              <td className="p-3">
                <code className="bunui-inline-code">{prop.defaultValue}</code>
              </td>
              <td className="p-3">{prop.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function ButtonPage() {
  return (
    <DocsPage toc={toc} footer={{enabled: false}} tableOfContentPopover={{enabled: false}}>
      <section className="flex flex-col gap-2">
        <DocsTitle>Button</DocsTitle>
        <DocsDescription className="text-md mt-2 mb-4">
          A clickable button component with multiple variants and states.
        </DocsDescription>
      </section>

      <DocsBody className="prose-sm">
        <ComponentPreview name="button-basic" />

        <h2 id="installation">Installation</h2>
        <InstallCommand item="https://bunui.xyz/r/button.json" />

        <h2 id="variants">Variants</h2>
        <ComponentPreview name="button-variants" />

        <h2 id="sizes">Sizes</h2>
        <ComponentPreview name="button-sizes" minHeight="10rem" />

        <h2 id="with-icons">With Icons</h2>
        <ComponentPreview name="button-with-icons" minHeight="10rem" />

        <h2 id="icon-only">Icon Only</h2>
        <ComponentPreview name="button-icon-only" minHeight="10rem" />

        <h2 id="disabled-state">Disabled State</h2>
        <ComponentPreview name="button-disabled" minHeight="10rem" />

        <h2 id="customization">Customization</h2>
        <p>
          Use the built-in props for common styles, then pass <code>className</code> for one-off customization.
        </p>
        <div className="not-prose">
          <CodeBlock
            code={`<Button variant="outline" size="lg" className="rounded-xl px-8">
  Get started
</Button>`}
            title="custom-button.tsx"
          />
        </div>

        <h2 id="api-reference">API Reference</h2>
        <h3>Button</h3>
        <ApiTable />
      </DocsBody>
    </DocsPage>
  );
}
