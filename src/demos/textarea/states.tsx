import {Textarea} from "@/components/ui/textarea";

export function States() {
  return (
    <div className="grid w-full max-w-sm gap-3">
      <Textarea placeholder="Default textarea" />
      <Textarea aria-invalid="true" defaultValue="Too short" />
      <Textarea disabled placeholder="Disabled textarea" />
    </div>
  );
}
