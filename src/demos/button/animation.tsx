import {Button} from "@/components/ui/button";

export function Animation() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button>Animated</Button>
      <Button animated={false}>
        Not animated
      </Button>
    </div>
  );
}
