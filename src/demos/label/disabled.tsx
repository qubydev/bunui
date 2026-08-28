import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";

export function Disabled() {
  return (
    <div className="group grid w-full max-w-sm gap-2" data-disabled="true">
      <Label htmlFor="disabled-email">Email</Label>
      <Input id="disabled-email" disabled placeholder="you@example.com" />
    </div>
  );
}
