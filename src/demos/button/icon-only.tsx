import {Bell, Check, Sun, Trash2} from "lucide-react";

import {Button} from "@/components/ui/button";

export function IconOnly() {
  return (
    <div className="flex gap-3">
      <Button aria-label="Confirm" size="icon" variant="default">
        <Check />
      </Button>
      <Button aria-label="Delete" size="icon" variant="destructive">
        <Trash2 />
      </Button>
      <Button aria-label="Theme" size="icon" variant="secondary">
        <Sun />
      </Button>
      <Button aria-label="Notifications" size="icon" variant="ghost">
        <Bell />
      </Button>
    </div>
  );
}
