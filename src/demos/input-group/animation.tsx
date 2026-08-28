import { Clipboard, Search } from "lucide-react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupKbd,
} from "@/components/ui/input-group";

export function Animation() {
  return (
    <div className="grid w-full max-w-sm gap-3">
      <InputGroup>
        <InputGroupInput placeholder="Press, focus, or paste..." />
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          <InputGroupKbd shortcut="ctrl+v">Ctrl</InputGroupKbd>
          <InputGroupKbd shortcut="ctrl+v">V</InputGroupKbd>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup animated={false}>
        <InputGroupInput placeholder="Not animated" />
        <InputGroupAddon>
          <Clipboard />
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}
