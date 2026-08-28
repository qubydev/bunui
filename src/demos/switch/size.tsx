import {Label} from "@/components/ui/label";
import {Switch} from "@/components/ui/switch";

export function Size() {
  return (
    <div className="grid gap-3">
      <div className="flex items-center gap-2">
        <Switch id="small-switch" size="sm" />
        <Label htmlFor="small-switch">Small</Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="default-switch" />
        <Label htmlFor="default-switch">Default</Label>
      </div>
    </div>
  );
}
