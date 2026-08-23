import type {DemoItem} from "@/demos";

export const demos: Record<string, DemoItem> = {
  "button-basic": {loader: () => import("./button/basic").then((m) => m.Basic), file: "en/button/basic.tsx"},
  "button-variants": {loader: () => import("./button/variants").then((m) => m.Variants), file: "en/button/variants.tsx"},
  "button-sizes": {loader: () => import("./button/sizes").then((m) => m.Sizes), file: "en/button/sizes.tsx"},
  "button-with-icons": {loader: () => import("./button/with-icons").then((m) => m.WithIcons), file: "en/button/with-icons.tsx"},
  "button-icon-only": {loader: () => import("./button/icon-only").then((m) => m.IconOnly), file: "en/button/icon-only.tsx"},
  "button-loading": {loader: () => import("./button/loading").then((m) => m.Loading), file: "en/button/loading.tsx"},
  "button-loading-state": {loader: () => import("./button/loading-state").then((m) => m.LoadingState), file: "en/button/loading-state.tsx"},
  "button-full-width": {loader: () => import("./button/full-width").then((m) => m.FullWidth), file: "en/button/full-width.tsx"},
  "button-disabled": {loader: () => import("./button/disabled").then((m) => m.Disabled), file: "en/button/disabled.tsx"},
  "button-render-function": {loader: () => import("./button/render-function").then((m) => m.RenderFunction), file: "en/button/render-function.tsx"},
  "button-custom-variants": {loader: () => import("./button/custom-variants").then((m) => m.CustomVariants), file: "en/button/custom-variants.tsx"},
  "button-custom-styles": {loader: () => import("./button/custom-styles").then((m) => m.CustomStyles), file: "en/button/custom-styles.tsx"},
};