import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";

export function Basic() {
  return (
    <div className="grid w-full max-w-sm gap-2">
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" placeholder="you@example.com" />
    </div>
  );
}
