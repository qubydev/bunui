import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";

export function Required() {
  return (
    <div className="grid w-full max-w-sm gap-2">
      <Label htmlFor="name">
        Name
        <span className="text-destructive">*</span>
      </Label>
      <Input id="name" required placeholder="Ada Lovelace" />
    </div>
  );
}
