import {Button} from "@/components/ui/button";

const variants = ["default", "secondary", "outline", "ghost", "danger"] as const;

export function Disabled() {
  return (
    <div className="flex flex-wrap gap-3">
      {variants.map((variant) => (
        <Button disabled key={variant} variant={variant}>
          {variant === "default" ? "Primary" : variant}
        </Button>
      ))}
    </div>
  );
}
