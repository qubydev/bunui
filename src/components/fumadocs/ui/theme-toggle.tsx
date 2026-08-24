"use client";

import {Button} from "@/registry/default/ui/button";
import {Airplay, Moon, Sun} from "@/components/fumadocs/ui/icons";
import {useTheme} from "@/components/theme-provider";
import {useIsMounted} from "@/hooks/use-is-mounted";

const full = [["light", Sun] as const, ["dark", Moon] as const, ["system", Airplay] as const];

export function ThemeToggle({
  className,
  mode = "light-dark",
}: {
  className?: string;
  mode?: "light-dark" | "light-dark-system";
}) {
  const {resolvedTheme, setTheme, theme = "system"} = useTheme();
  const mounted = useIsMounted();
  const items = mode === "light-dark" ? full.filter(([key]) => key !== "system") : full;
  const value = mounted ? (mode === "light-dark" ? resolvedTheme ?? "light" : theme) : "system";
  const currentIndex = Math.max(0, items.findIndex(([key]) => key === value));
  const [nextTheme] = items[(currentIndex + 1) % items.length];
  const [, Icon] = items[currentIndex] ?? full[2];

  return (
    <Button
      aria-label={`Switch to ${nextTheme} theme`}
      className={className}
      data-theme-toggle=""
      isDisabled={!mounted}
      isIconOnly
      size="sm"
      type="button"
      variant="ghost"
      onPress={() => setTheme(nextTheme)}
    >
      <Icon className="size-4.5" />
    </Button>
  );
}
