import {Label} from "@/components/ui/label";
import {Switch} from "@/components/ui/switch";

export function Description() {
  return (
    <div className="flex w-full max-w-sm items-center justify-between gap-4">
      <div className="grid gap-1">
        <Label htmlFor="focus-sync">Share across devices</Label>
        <p className="text-sm text-muted-foreground">
          Focus is shared across devices and turns off when you leave the app.
        </p>
      </div>
      <Switch id="focus-sync" />
    </div>
  );
}
