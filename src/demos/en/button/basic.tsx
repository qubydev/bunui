"use client";

import {Button} from "@/registry/default/ui/button";

export function Basic() {
  return <Button onPress={() => console.log("Button pressed")}>Click me</Button>;
}
