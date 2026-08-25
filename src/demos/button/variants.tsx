import {Button} from "@/components/ui/button";

const variants = ["default", "secondary", "outline", "ghost", "success", "success-soft", "danger", "danger-soft"] as const;

export function Variants() {
  return (
    <div className="grid grid-cols-2 place-items-center gap-3 sm:grid-cols-4">
      {variants.map((variant) => (
        <Button key={variant} variant={variant}>
          {variant === "default" ? "Primary" : variant}
        </Button>
      ))}
    </div>
  );
}
