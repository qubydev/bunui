"use client";

import {useState} from "react";

import {Label} from "@/components/ui/label";
import {Switch} from "@/components/ui/switch";

export function Controlled() {
  const [checked, setChecked] = useState(true);

  return (
    <div className="flex items-center gap-2">
      <Switch id="controlled-switch" checked={checked} onCheckedChange={setChecked} />
      <Label htmlFor="controlled-switch">
        Notifications {checked ? "on" : "off"}
      </Label>
    </div>
  );
}
