import type {ComponentType} from "react";

import {Animation} from "@/demos/button/animation";
import {Basic} from "@/demos/button/basic";
import {Disabled} from "@/demos/button/disabled";
import {IconOnly} from "@/demos/button/icon-only";
import {Sizes} from "@/demos/button/sizes";
import {Variants} from "@/demos/button/variants";
import {WithIcons} from "@/demos/button/with-icons";
import {Animation as InputAnimation} from "@/demos/input/animation";
import {Basic as InputBasic} from "@/demos/input/basic";
import {FileInput} from "@/demos/input/file";
import {States as InputStates} from "@/demos/input/states";
import {Types as InputTypes} from "@/demos/input/types";

export interface DemoItem {
  component: ComponentType;
  file: string;
}

export const demos: Record<string, DemoItem> = {
  "button-basic": {
    component: Basic,
    file: "button/basic.tsx",
  },
  "button-variants": {
    component: Variants,
    file: "button/variants.tsx",
  },
  "button-sizes": {
    component: Sizes,
    file: "button/sizes.tsx",
  },
  "button-with-icons": {
    component: WithIcons,
    file: "button/with-icons.tsx",
  },
  "button-icon-only": {
    component: IconOnly,
    file: "button/icon-only.tsx",
  },
  "button-disabled": {
    component: Disabled,
    file: "button/disabled.tsx",
  },
  "button-animation": {
    component: Animation,
    file: "button/animation.tsx",
  },
  "input-basic": {
    component: InputBasic,
    file: "input/basic.tsx",
  },
  "input-types": {
    component: InputTypes,
    file: "input/types.tsx",
  },
  "input-states": {
    component: InputStates,
    file: "input/states.tsx",
  },
  "input-animation": {
    component: InputAnimation,
    file: "input/animation.tsx",
  },
  "input-file": {
    component: FileInput,
    file: "input/file.tsx",
  },
};
