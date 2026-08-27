import {Input} from "@/components/ui/input";

export function Types() {
  return (
    <div className="grid w-full max-w-sm gap-3">
      <Input type="email" placeholder="Email" />
      <Input type="password" placeholder="Password" />
      <Input type="search" placeholder="Search..." />
    </div>
  );
}
