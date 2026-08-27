import {Input} from "@/components/ui/input";

export function States() {
  return (
    <div className="grid w-full max-w-sm gap-3">
      <Input type="email" placeholder="Email" />
      <Input disabled type="email" placeholder="Disabled" />
      <Input aria-invalid type="email" defaultValue="wrong@email" />
    </div>
  );
}
