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
import {Animation as InputGroupAnimation} from "@/demos/input-group/animation";
import {Basic as InputGroupBasic} from "@/demos/input-group/basic";
import {Button as InputGroupButton} from "@/demos/input-group/button";
import {Kbd as InputGroupKbd} from "@/demos/input-group/kbd";
import {States as InputGroupStates} from "@/demos/input-group/states";
import {Text as InputGroupText} from "@/demos/input-group/text";
import {Animation as TextareaAnimation} from "@/demos/textarea/animation";
import {Basic as TextareaBasic} from "@/demos/textarea/basic";
import {WithButton as TextareaButton} from "@/demos/textarea/button";
import {WithInputGroup as TextareaInputGroup} from "@/demos/textarea/input-group";
import {States as TextareaStates} from "@/demos/textarea/states";

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
  "input-group-basic": {
    component: InputGroupBasic,
    file: "input-group/basic.tsx",
  },
  "input-group-text": {
    component: InputGroupText,
    file: "input-group/text.tsx",
  },
  "input-group-button": {
    component: InputGroupButton,
    file: "input-group/button.tsx",
  },
  "input-group-kbd": {
    component: InputGroupKbd,
    file: "input-group/kbd.tsx",
  },
  "input-group-states": {
    component: InputGroupStates,
    file: "input-group/states.tsx",
  },
  "input-group-animation": {
    component: InputGroupAnimation,
    file: "input-group/animation.tsx",
  },
  "textarea-basic": {
    component: TextareaBasic,
    file: "textarea/basic.tsx",
  },
  "textarea-states": {
    component: TextareaStates,
    file: "textarea/states.tsx",
  },
  "textarea-button": {
    component: TextareaButton,
    file: "textarea/button.tsx",
  },
  "textarea-input-group": {
    component: TextareaInputGroup,
    file: "textarea/input-group.tsx",
  },
  "textarea-animation": {
    component: TextareaAnimation,
    file: "textarea/animation.tsx",
  },
};
