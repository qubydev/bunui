"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { GithubLogo } from "@/components/logos";
import ThemeToggle from "@/components/ThemeToggle";
import {
  formatStars,
  getCachedGithubStars,
  getGithubStars,
} from "@/lib/github-stars-client";
import { cn } from "@/lib/utils";

const GITHUB_URL = "https://github.com/qubydev/bunui";
const TOPBAR_BUN_BODY_PATH =
  "M306 78.5c36.5 0 25.267 54.5 43.767 69.5 0 0 4.5-44 17.5-57s31.311-8.08 43.5 5c61.5 66 142.965 75 172.593 186.544C616.581 407.615 563.83 530.197 306 530.197S-4.315 407.615 28.906 282.544C58.534 171 140 162 201.5 96c12.189-13.08 30.5-18 43.5-5s17.5 57 17.5 57c18.5-15 7-69.5 43.5-69.5";

const LINKS = [
  { label: "Home", href: "/" },
  { label: "Components", href: "/components" },
];

function TopbarBunLogo({ className }: { className?: string }) {
  const shadowId = useId().replace(/:/g, "");
  const filterId = `${shadowId}-topbar-bun-inner-shadow`;

  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 612 612"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
          <feOffset dy="4" in="SourceAlpha" result="offset" />
          <feGaussianBlur stdDeviation="4" in="offset" result="blur" />
          <feComposite
            in="SourceAlpha"
            in2="blur"
            operator="out"
            result="inner"
          />
          <feFlood
            floodColor="white"
            floodOpacity="1"
            result="color"
          />
          <feComposite in="color" in2="inner" operator="in" result="shadow" />
          <feComposite in="shadow" in2="SourceGraphic" operator="over" />
        </filter>
      </defs>
      <path
        d={TOPBAR_BUN_BODY_PATH}
        fill="var(--primary)"
        filter={`url(#${filterId})`}
      />
      <rect
        x="201.569"
        y="254.878"
        width="54.589"
        height="103.245"
        rx="27.295"
        fill="var(--primary-foreground)"
      />
      <rect
        x="355.842"
        y="254.878"
        width="54.589"
        height="103.245"
        rx="27.295"
        fill="var(--primary-foreground)"
      />
    </svg>
  );
}

export default function GooeyNavbar({ className }: { className?: string }) {
  const pathname = usePathname();
  const [stars, setStars] = useState<number | null>(getCachedGithubStars());

  useEffect(() => {
    let cancelled = false;

    getGithubStars().then((value) => {
      if (!cancelled) setStars(value);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <header
      className={cn(
        "pointer-events-none fixed inset-x-0 top-4 z-50 px-3 sm:px-4",
        className,
      )}
    >
      <nav className="pointer-events-auto relative mx-auto flex min-h-13 w-full max-w-navbar items-center justify-between gap-2 overflow-hidden rounded-full border border-border bg-popover/92 py-2 pl-3 pr-2 text-foreground backdrop-blur-xl transition-[max-width] duration-300 ease-out hover:max-w-navbar-hover motion-reduce:transition-none sm:min-h-14 sm:pl-4">
        <Link
          href="/"
          aria-label="Bun UI home"
          className="flex h-7 w-9 shrink-0 items-center justify-center text-primary transition-opacity hover:opacity-80 sm:h-8 sm:w-10"
        >
          <TopbarBunLogo className="h-7 w-9 sm:h-8 sm:w-10" />
        </Link>

        <div className="absolute left-1/2 flex min-w-0 -translate-x-1/2 items-center gap-1 whitespace-nowrap text-sm font-medium">
          {LINKS.map((link) => {
            const active =
              link.href === "/components"
                ? pathname === "/components" ||
                  pathname.startsWith("/components/")
                : pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-full px-2.5 py-2 transition-colors hover:bg-muted hover:text-foreground sm:px-3",
                  active
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-1.5">
          <ThemeToggle />
          <Button
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub repository"
            size="sm"
            className="group h-10 gap-1.5 overflow-hidden px-3 font-medium leading-none tabular-nums sm:px-4"
          >
            <span
              className="relative flex size-4.5 shrink-0 items-center justify-center"
              aria-hidden="true"
            >
              <GithubLogo className="absolute size-4.5 transition-all duration-200 group-hover:scale-75 group-hover:opacity-0" />
              <Star className="absolute size-4.5 scale-75 fill-primary-foreground text-primary-foreground opacity-0 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100" />
            </span>
            {stars != null && <span>{formatStars(stars)}</span>}
          </Button>
        </div>
      </nav>
    </header>
  );
}
