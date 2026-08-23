import type {Root} from "fumadocs-core/page-tree";
export const componentTree = {
  name: "Components",
  children: [
    {type: "separator", name: "Overview"},
    {type: "page", name: "All Components", url: "/components"},
    {type: "separator", name: "Components"},
    {type: "page", name: "Button", url: "/components/button"},
  ],
} as unknown as Root;