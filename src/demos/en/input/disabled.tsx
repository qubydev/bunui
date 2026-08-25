import {Input} from "@/registry/default/ui/input";

export function Disabled() {
  return (
    <div className="w-full max-w-sm">
      <Input disabled placeholder="Disabled input" />
    </div>
  );
}
