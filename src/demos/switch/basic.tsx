import {Label} from "@/components/ui/label";
import {Switch} from "@/components/ui/switch";

export function Basic() {
  return (
    <div className="flex items-center gap-2">
      <Switch id="airplane-mode" />
      <Label htmlFor="airplane-mode">Airplane mode</Label>
    </div>
  );
}
