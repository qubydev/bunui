import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { BunUILogo } from "@/components/bunui-logo";

export const baseOptions: BaseLayoutProps = {
  nav: {
    title: <BunUILogo />,
    transparentMode: "always",
  },
  links: [
    { text: "Components", url: "/components", active: "nested-url", on: "nav" },
  ],
};