import { Search, Sparkles } from "lucide-react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupKbd,
} from "@/components/ui/input-group";

export function Kbd() {
  return (
    <div className="grid w-full max-w-sm gap-3">
      <InputGroup>
        <InputGroupInput placeholder="Search..." />
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          <InputGroupKbd shortcut="ctrl+k">Ctrl</InputGroupKbd>
          <InputGroupKbd shortcut="ctrl+k">K</InputGroupKbd>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput placeholder="Ask AI..." />
        <InputGroupAddon>
          <Sparkles />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          <InputGroupKbd shortcut="tab">Tab</InputGroupKbd>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}
