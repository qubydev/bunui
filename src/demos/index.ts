import type {ComponentType} from "react";
import {demos as enDemos} from "./en";

export interface DemoItem {
  loader: () => Promise<ComponentType>;
  file: string;
}

export function getDemo(name: string, _lang?: string): DemoItem | undefined {
  return enDemos[name];
}