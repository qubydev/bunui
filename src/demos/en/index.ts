import type {DemoItem} from "@/demos";

export const demos: Record<string, DemoItem> = {
  "button-basic": {loader: () => import("./button/basic").then((m) => m.Basic), file: "en/button/basic.tsx"},
  "button-variants": {loader: () => import("./button/variants").then((m) => m.Variants), file: "en/button/variants.tsx"},
  "button-sizes": {loader: () => import("./button/sizes").then((m) => m.Sizes), file: "en/button/sizes.tsx"},
  "button-with-icons": {loader: () => import("./button/with-icons").then((m) => m.WithIcons), file: "en/button/with-icons.tsx"},
  "button-icon-only": {loader: () => import("./button/icon-only").then((m) => m.IconOnly), file: "en/button/icon-only.tsx"},
  "button-disabled": {loader: () => import("./button/disabled").then((m) => m.Disabled), file: "en/button/disabled.tsx"},
  "input-basic": {loader: () => import("./input/basic").then((m) => m.Basic), file: "en/input/basic.tsx"},
  "input-sizes": {loader: () => import("./input/sizes").then((m) => m.Sizes), file: "en/input/sizes.tsx"},
  "input-disabled": {loader: () => import("./input/disabled").then((m) => m.Disabled), file: "en/input/disabled.tsx"},
};
