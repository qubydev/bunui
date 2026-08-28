import {DocsBody, DocsDescription, DocsPage, DocsTitle} from "fumadocs-ui/layouts/notebook/page";

import {ComponentPreview} from "@/components/component-preview";
import {InstallCommand} from "@/components/install-command";

const toc = [
  {title: "Installation", url: "#installation", depth: 2},
  {title: "Text", url: "#text", depth: 2},
  {title: "Button", url: "#button", depth: 2},
  {title: "Kbd", url: "#kbd", depth: 2},
  {title: "Textarea", url: "#textarea", depth: 2},
  {title: "States", url: "#states", depth: 2},
  {title: "Animation", url: "#animation", depth: 2},
  {title: "API Reference", url: "#api-reference", depth: 2},
];

function ApiTable() {
  const props = [
    {
      component: "InputGroup",
      prop: "animated",
      type: "boolean",
      defaultValue: "true",
      description: "Enables the group focus, press, release, and paste animation.",
    },
    {
      component: "InputGroupAddon",
      prop: "align",
      type: "'inline-start' | 'inline-end' | 'block-start' | 'block-end'",
      defaultValue: "'inline-start'",
      description: "Positions addon content around the grouped input.",
    },
    {
      component: "InputGroupButton",
      prop: "variant",
      type: "'default' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'link'",
      defaultValue: "'ghost'",
      description: "Controls the inline action button style.",
    },
    {
      component: "InputGroupButton",
      prop: "size",
      type: "'xs' | 'icon-xs' | 'sm' | 'icon-sm'",
      defaultValue: "'xs'",
      description: "Controls the inline action button size.",
    },
    {
      component: "InputGroupKbd",
      prop: "shortcut",
      type: "string",
      defaultValue: "-",
      description: "Squeezes the keycap while the matching key or key combination is pressed.",
    },
    {
      component: "InputGroupTextarea",
      prop: "className",
      type: "string",
      defaultValue: "-",
      description: "Adds custom classes to the grouped textarea.",
    },
    {
      component: "InputGroupInput",
      prop: "className",
      type: "string",
      defaultValue: "-",
      description: "Adds custom classes to the grouped input.",
    },
  ];

  return (
    <div className="not-prose my-4 overflow-x-auto rounded-lg border">
      <table className="w-full min-w-[56rem] border-collapse text-left text-sm">
        <thead className="bg-muted/60 text-foreground">
          <tr>
            <th className="p-3 font-medium">Component</th>
            <th className="p-3 font-medium">Prop</th>
            <th className="p-3 font-medium">Type</th>
            <th className="p-3 font-medium">Default</th>
            <th className="p-3 font-medium">Description</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {props.map((prop) => (
            <tr key={`${prop.component}-${prop.prop}`}>
              <td className="p-3">
                <code>{prop.component}</code>
              </td>
              <td className="p-3">
                <code>{prop.prop}</code>
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

export default function InputGroupPage() {
  return (
    <DocsPage toc={toc} footer={{enabled: false}} tableOfContentPopover={{enabled: false}}>
      <DocsTitle>Input Group</DocsTitle>
      <DocsDescription>
        Add icons, text, keyboard hints, and inline actions to inputs.
      </DocsDescription>

      <DocsBody>
        <ComponentPreview name="input-group-basic" />

        <h2 id="installation">Installation</h2>
        <InstallCommand item="https://bunui.xyz/r/input-group.json" />

        <h2 id="text">Text</h2>
        <ComponentPreview name="input-group-text" />

        <h2 id="button">Button</h2>
        <ComponentPreview name="input-group-button" />

        <h2 id="kbd">Kbd</h2>
        <ComponentPreview name="input-group-kbd" />

        <h2 id="textarea">Textarea</h2>
        <ComponentPreview name="textarea-input-group" />

        <h2 id="states">States</h2>
        <ComponentPreview name="input-group-states" />

        <h2 id="animation">Animation</h2>
        <ComponentPreview name="input-group-animation" />

        <h2 id="api-reference">API Reference</h2>
        <ApiTable />
      </DocsBody>
    </DocsPage>
  );
}
