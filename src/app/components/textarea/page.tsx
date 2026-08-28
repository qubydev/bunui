import {DocsBody, DocsDescription, DocsPage, DocsTitle} from "fumadocs-ui/layouts/notebook/page";

import {ComponentPreview} from "@/components/component-preview";
import {InstallCommand} from "@/components/install-command";

const toc = [
  {title: "Installation", url: "#installation", depth: 2},
  {title: "States", url: "#states", depth: 2},
  {title: "Button", url: "#button", depth: 2},
  {title: "Input Group", url: "#input-group", depth: 2},
  {title: "Animation", url: "#animation", depth: 2},
  {title: "API Reference", url: "#api-reference", depth: 2},
];

function ApiTable() {
  const props = [
    {
      name: "animated",
      type: "boolean",
      defaultValue: "true",
      description: "Enables the focus, press, release, and paste animation.",
    },
    {
      name: "className",
      type: "string",
      defaultValue: "-",
      description: "Adds custom classes to the textarea.",
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

export default function TextareaPage() {
  return (
    <DocsPage toc={toc} footer={{enabled: false}} tableOfContentPopover={{enabled: false}}>
      <DocsTitle>Textarea</DocsTitle>
      <DocsDescription>
        A multiline text field for comments, messages, and longer form input.
      </DocsDescription>

      <DocsBody>
        <ComponentPreview name="textarea-basic" />

        <h2 id="installation">Installation</h2>
        <InstallCommand item="https://bunui.xyz/r/textarea.json" />

        <h2 id="states">States</h2>
        <ComponentPreview name="textarea-states" />

        <h2 id="button">Button</h2>
        <ComponentPreview name="textarea-button" />

        <h2 id="input-group">Input Group</h2>
        <ComponentPreview name="textarea-input-group" />

        <h2 id="animation">Animation</h2>
        <ComponentPreview name="textarea-animation" />

        <h2 id="api-reference">API Reference</h2>
        <ApiTable />
      </DocsBody>
    </DocsPage>
  );
}
