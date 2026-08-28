import {Send} from "lucide-react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
  InputGroupText,
} from "@/components/ui/input-group";

export function WithInputGroup() {
  return (
    <div className="w-full max-w-sm">
      <InputGroup className="h-auto">
        <InputGroupTextarea placeholder="Ask, search, or write..." />
        <InputGroupAddon align="block-end">
          <InputGroupText>0/280</InputGroupText>
          <InputGroupButton size="icon-xs" className="ml-auto" aria-label="Send">
            <Send />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}
