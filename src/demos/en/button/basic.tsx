"use client";

import {Button} from "@/registry/default/ui/button";

export function Basic() {
  return <Button onClick={() => console.log("Button clicked")}>Click me</Button>;
}
