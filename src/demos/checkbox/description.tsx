import {Checkbox} from "@/components/ui/checkbox";
import {Label} from "@/components/ui/label";

export function Description() {
  return (
    <div className="flex w-full max-w-sm items-start gap-3">
      <Checkbox id="marketing" className="mt-0.5" />
      <div className="grid gap-1">
        <Label htmlFor="marketing">Marketing emails</Label>
        <p className="text-sm text-muted-foreground">
          Receive product updates, release notes, and occasional announcements.
        </p>
      </div>
    </div>
  );
}
