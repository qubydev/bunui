import {Label} from "@/components/ui/label";
import {Switch} from "@/components/ui/switch";

export function Animation() {
  return (
    <div className="grid gap-3">
      <div className="flex items-center gap-2">
        <Switch id="animated-switch" />
        <Label htmlFor="animated-switch">Animated</Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="static-switch" animated={false} />
        <Label htmlFor="static-switch">Not animated</Label>
      </div>
    </div>
  );
}
