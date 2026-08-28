import {DocsBody, DocsDescription, DocsPage, DocsTitle} from "fumadocs-ui/layouts/notebook/page";

import {ComponentPreview} from "@/components/component-preview";
import {InstallCommand} from "@/components/install-command";

const toc = [
  {title: "Installation", url: "#installation", depth: 2},
  {title: "Checked", url: "#checked", depth: 2},
  {title: "Indeterminate", url: "#indeterminate", depth: 2},
  {title: "Description", url: "#description", depth: 2},
  {title: "Disabled", url: "#disabled", depth: 2},
  {title: "Animation", url: "#animation", depth: 2},
  {title: "API Reference", url: "#api-reference", depth: 2},
];

function ApiTable() {
  const props = [
    {
      name: "checked",
      type: "boolean",
      defaultValue: "-",
      description: "Controls the checked state.",
    },
    {
      name: "defaultChecked",
      type: "boolean",
      defaultValue: "false",
      description: "Sets the initial checked state for uncontrolled usage.",
    },
    {
      name: "onCheckedChange",
      type: "(checked: boolean) => void",
      defaultValue: "-",
      description: "Runs when the checked state changes.",
    },
    {
      name: "indeterminate",
      type: "boolean",
      defaultValue: "false",
      description: "Shows the mixed state.",
    },
    {
      name: "animated",
      type: "boolean",
      defaultValue: "true",
      description: "Enables the press animation. Set to false for a static checkbox.",
    },
    {
      name: "className",
      type: "string",
      defaultValue: "-",
      description: "Adds custom classes to the checkbox.",
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

export default function CheckboxPage() {
  return (
    <DocsPage toc={toc} footer={{enabled: false}} tableOfContentPopover={{enabled: false}}>
      <DocsTitle>Checkbox</DocsTitle>
      <DocsDescription>
        A control that lets users toggle between checked and unchecked.
      </DocsDescription>

      <DocsBody>
        <ComponentPreview name="checkbox-basic" />

        <h2 id="installation">Installation</h2>
        <InstallCommand item="https://bunui.xyz/r/checkbox.json" />

        <h2 id="checked">Checked</h2>
        <ComponentPreview name="checkbox-checked" />

        <h2 id="indeterminate">Indeterminate</h2>
        <ComponentPreview name="checkbox-indeterminate" />

        <h2 id="description">Description</h2>
        <ComponentPreview name="checkbox-description" />

        <h2 id="disabled">Disabled</h2>
        <ComponentPreview name="checkbox-disabled" />

        <h2 id="animation">Animation</h2>
        <ComponentPreview name="checkbox-animation" />

        <h2 id="api-reference">API Reference</h2>
        <ApiTable />
      </DocsBody>
    </DocsPage>
  );
}
