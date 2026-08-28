"use client";

import {useState} from "react";

import {Checkbox} from "@/components/ui/checkbox";
import {Label} from "@/components/ui/label";

export function Checked() {
  const [checked, setChecked] = useState(false);

  return (
    <div className="flex items-center gap-2">
      <Checkbox id="controlled" checked={checked} onCheckedChange={setChecked} />
      <Label htmlFor="controlled">Enable notifications</Label>
    </div>
  );
}
