import {Checkbox} from "@/components/ui/checkbox";
import {Label} from "@/components/ui/label";

export function Animation() {
  return (
    <div className="grid gap-3">
      <div className="flex items-center gap-2">
        <Checkbox id="animated-checkbox" />
        <Label htmlFor="animated-checkbox">Animated</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="static-checkbox" animated={false} />
        <Label htmlFor="static-checkbox">Not animated</Label>
      </div>
    </div>
  );
}
