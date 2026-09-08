"use client";

import { cn } from "@/lib/utils";

const ContrastIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
    <path d="M12 3l0 18" />
    <path d="M12 9l4.65 -4.65" />
    <path d="M12 14.3l7.37 -7.37" />
    <path d="M12 19.6l8.85 -8.85" />
  </svg>
);

export default function ThemeToggle({
  className = "",
}: {
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => {
        const nextIsDark = !document.documentElement.classList.contains("dark");

        document.documentElement.classList.toggle("dark", nextIsDark);
        localStorage.setItem("bunui-theme", nextIsDark ? "dark" : "light");
      }}
      aria-label="Toggle theme"
      className={cn(
        "inline-flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-transparent text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
    >
      <ContrastIcon className="size-5" />
    </button>
  );
}
