import {Textarea} from "@/components/ui/textarea";

export function Animation() {
  return (
    <div className="grid w-full max-w-sm gap-3">
      <Textarea placeholder="Press, focus, or paste..." />
      <Textarea animated={false} placeholder="Not animated" />
    </div>
  );
}
