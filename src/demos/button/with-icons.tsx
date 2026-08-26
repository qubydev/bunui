import {CircleCheck, Rocket, Send, Trash2} from "lucide-react";

import {Button} from "@/components/ui/button";

export function WithIcons() {
  return (
    <div className="inline-flex max-w-full flex-wrap justify-center gap-3">
      <Button>
        <Rocket />
        Launch
      </Button>
      <Button variant="danger">
        <Trash2 />
        Delete
      </Button>
      <Button variant="outline">
        <Send />
        Send
      </Button>
      <Button variant="success">
        <CircleCheck />
        Approve
      </Button>
    </div>
  );
}
