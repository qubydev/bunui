import {Input} from "@/registry/default/ui/input";

export function Basic() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <Input placeholder="Your name" />
      <Input type="email" placeholder="you@example.com" />
      <Input type="password" placeholder="Password" />
    </div>
  );
}
