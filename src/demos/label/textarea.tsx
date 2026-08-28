import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";

export function WithTextarea() {
  return (
    <div className="grid w-full max-w-sm gap-2">
      <Label htmlFor="message">Message</Label>
      <Textarea id="message" placeholder="Write your message..." />
    </div>
  );
}
