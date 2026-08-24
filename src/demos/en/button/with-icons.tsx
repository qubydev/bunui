import {CircleCheck, PaperPlane, Rocket, TrashBin} from "@gravity-ui/icons";
import {Button} from "@/registry/default/ui/button";

export function WithIcons() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button>
        <Rocket />
        Launch
      </Button>
      <Button variant="danger">
        <TrashBin />
        Delete
      </Button>
      <Button variant="outline">
        <PaperPlane />
        Send
      </Button>
      <Button variant="success">
        <CircleCheck />
        Approve
      </Button>
    </div>
  );
}
