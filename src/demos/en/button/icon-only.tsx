import {Bell, Check, Sun, TrashBin} from "@gravity-ui/icons";
import {Button} from "@/registry/default/ui/button";

export function IconOnly() {
  return (
    <div className="flex gap-3">
      <Button isIconOnly aria-label="Confirm" variant="success">
        <Check />
      </Button>
      <Button isIconOnly aria-label="Delete" variant="danger">
        <TrashBin />
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
