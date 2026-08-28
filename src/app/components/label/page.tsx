import {DocsBody, DocsDescription, DocsPage, DocsTitle} from "fumadocs-ui/layouts/notebook/page";

import {ComponentPreview} from "@/components/component-preview";
import {InstallCommand} from "@/components/install-command";

const toc = [
  {title: "Installation", url: "#installation", depth: 2},
  {title: "Required", url: "#required", depth: 2},
  {title: "Textarea", url: "#textarea", depth: 2},
  {title: "Disabled", url: "#disabled", depth: 2},
  {title: "API Reference", url: "#api-reference", depth: 2},
];

function ApiTable() {
  const props = [
    {
      name: "htmlFor",
      type: "string",
      defaultValue: "-",
      description: "Associates the label with a form control by id.",
    },
    {
      name: "className",
      type: "string",
      defaultValue: "-",
      description: "Adds custom classes to the label.",
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
                <code>{prop.name}</code>
              </td>
              <td className="p-3 leading-6">
                <code>{prop.type}</code>
              </td>
              <td className="p-3">
                <code>{prop.defaultValue}</code>
              </td>
              <td className="p-3">{prop.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function LabelPage() {
  return (
    <DocsPage toc={toc} footer={{enabled: false}} tableOfContentPopover={{enabled: false}}>
      <DocsTitle>Label</DocsTitle>
      <DocsDescription>
        An accessible label associated with form controls.
      </DocsDescription>

      <DocsBody>
        <ComponentPreview name="label-basic" />

        <h2 id="installation">Installation</h2>
        <InstallCommand item="https://bunui.xyz/r/label.json" />

        <h2 id="required">Required</h2>
        <ComponentPreview name="label-required" />

        <h2 id="textarea">Textarea</h2>
        <ComponentPreview name="label-textarea" />

        <h2 id="disabled">Disabled</h2>
        <ComponentPreview name="label-disabled" />

        <h2 id="api-reference">API Reference</h2>
        <ApiTable />
      </DocsBody>
    </DocsPage>
  );
}
