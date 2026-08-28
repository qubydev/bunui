import {Label} from "@/components/ui/label";
import {Switch} from "@/components/ui/switch";

export function States() {
  return (
    <div className="grid gap-3">
      <div className="flex items-center gap-2">
        <Switch id="disabled-switch" disabled />
        <Label htmlFor="disabled-switch">Disabled</Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="disabled-checked-switch" disabled defaultChecked />
        <Label htmlFor="disabled-checked-switch">Disabled checked</Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="invalid-switch" aria-invalid="true" />
        <Label htmlFor="invalid-switch">Invalid</Label>
      </div>
    </div>
  );
}
