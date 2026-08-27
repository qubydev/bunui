import {Button} from "@/components/ui/button";

export function Variants() {
  return (
    <div className="grid grid-cols-2 place-items-center gap-3 sm:grid-cols-4">
      <Button>Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="link">Link</Button>
    </div>
  );
}
