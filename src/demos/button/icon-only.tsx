import {Bell, Check, Sun, Trash2} from "lucide-react";

import {Button} from "@/components/ui/button";

export function IconOnly() {
  return (
    <div className="flex gap-3">
      <Button isIconOnly aria-label="Confirm" variant="success">
        <Check />
      </Button>
      <Button isIconOnly aria-label="Delete" variant="danger">
        <Trash2 />
      </Button>
      <Button isIconOnly aria-label="Theme" variant="secondary">
        <Sun />
      </Button>
      <Button isIconOnly aria-label="Notifications" variant="ghost">
        <Bell />
      </Button>
    </div>
  );
}
