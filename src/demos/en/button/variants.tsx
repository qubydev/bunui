import {Button} from "@/registry/default/ui/button";

export function Variants() {
  return (
    <div className="grid grid-cols-2 place-items-center gap-3 sm:grid-cols-4">
      <Button>Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="success">Success</Button>
      <Button variant="success-soft">Success Soft</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="danger-soft">Danger Soft</Button>
    </div>
  );
}
