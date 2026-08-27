import {Input} from "@/components/ui/input";

export function Animation() {
  return (
    <div className="grid w-full max-w-sm gap-3">
      <Input placeholder="Animated on focus" />
      <Input animated={false} placeholder="Not animated" />
    </div>
  );
}
