import {DocsBody, DocsDescription, DocsPage, DocsTitle} from "fumadocs-ui/layouts/notebook/page";

import {ComponentPreview} from "@/components/component-preview";
import {InstallCommand} from "@/components/install-command";

const toc = [
  {title: "Installation", url: "#installation", depth: 2},
  {title: "Types", url: "#types", depth: 2},
  {title: "States", url: "#states", depth: 2},
  {title: "File Input", url: "#file-input", depth: 2},
  {title: "Animation", url: "#animation", depth: 2},
  {title: "API Reference", url: "#api-reference", depth: 2},
];

function ApiTable() {
  const props = [
    {
      name: "type",
      type: "string",
      defaultValue: "'text'",
      description: "Sets the native input type.",
    },
    {
      name: "animated",
      type: "boolean",
      defaultValue: "true",
      description: "Enables the focus animation. Set to false for a static input.",
    },
    {
      name: "className",
      type: "string",
      defaultValue: "-",
      description: "Adds custom classes to the input.",
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

export default function InputPage() {
  return (
    <DocsPage toc={toc} footer={{enabled: false}} tableOfContentPopover={{enabled: false}}>
      <DocsTitle>Input</DocsTitle>
      <DocsDescription>
        A text input component for forms and user data entry.
      </DocsDescription>

      <DocsBody>
        <ComponentPreview name="input-basic" />

        <h2 id="installation">Installation</h2>
        <InstallCommand item="https://bunui.xyz/r/input.json" />

        <h2 id="types">Types</h2>
        <ComponentPreview name="input-types" />

        <h2 id="states">States</h2>
        <ComponentPreview name="input-states" />

        <h2 id="file-input">File Input</h2>
        <ComponentPreview name="input-file" />

        <h2 id="animation">Animation</h2>
        <ComponentPreview name="input-animation" />

        <h2 id="api-reference">API Reference</h2>
        <h3>Input</h3>
        <ApiTable />
      </DocsBody>
    </DocsPage>
  );
}
