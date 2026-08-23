import type {ReactNode} from "react";
import {DocsLayout} from "@/components/fumadocs/layouts/notebook";
import {componentTree} from "@/components/component-tree";

export default function ComponentsLayout({children}: {children: ReactNode}) {
  return <DocsLayout tree={componentTree}>{children}</DocsLayout>;
}