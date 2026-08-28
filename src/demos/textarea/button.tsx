import {Button} from "@/components/ui/button";
import {Textarea} from "@/components/ui/textarea";

export function WithButton() {
  return (
    <div className="grid w-full max-w-sm gap-3">
      <Textarea placeholder="Write a short note..." />
      <Button className="justify-self-end">Send message</Button>
    </div>
  );
}
