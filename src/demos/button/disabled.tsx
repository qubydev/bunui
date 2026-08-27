import {Button} from "@/components/ui/button";

export function Disabled() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button disabled>Default</Button>
      <Button disabled variant="secondary">Secondary</Button>
      <Button disabled variant="outline">Outline</Button>
      <Button disabled variant="ghost">Ghost</Button>
      <Button disabled variant="destructive">Destructive</Button>
    </div>
  );
}
