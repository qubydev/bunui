import {CircleCheck, Rocket, Send, Trash2} from "lucide-react";
import {Button} from "@/registry/default/ui/button";

export function WithIcons() {
  return (
    <div className="flex flex-wrap gap-3">
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

