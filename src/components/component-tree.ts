import type {Root} from "fumadocs-core/page-tree";

export const componentTree = {
  name: "Components",
  children: [
    {type: "separator", name: "Overview"},
    {type: "page", name: "All Components", url: "/components"},
    {type: "separator", name: "Components"},
    {type: "page", name: "Button", url: "/components/button"},
    {type: "page", name: "Checkbox", url: "/components/checkbox"},
    {type: "page", name: "Input", url: "/components/input"},
    {type: "page", name: "Input Group", url: "/components/input-group"},
    {type: "page", name: "Label", url: "/components/label"},
    {type: "page", name: "Switch", url: "/components/switch"},
    {type: "page", name: "Textarea", url: "/components/textarea"},
  ],
} as unknown as Root;
