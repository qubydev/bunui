"use client";

import {Button} from "@bunui/react";

export function Basic() {
  return <Button onPress={() => console.log("Button pressed")}>Click me</Button>;
}
