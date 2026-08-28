import {Checkbox} from "@/components/ui/checkbox";
import {Label} from "@/components/ui/label";

export function Indeterminate() {
  return (
    <div className="flex items-center gap-2">
      <Checkbox id="partially-selected" indeterminate />
      <Label htmlFor="partially-selected">Some items selected</Label>
    </div>
  );
}
