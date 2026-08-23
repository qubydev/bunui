"use client";

import {useEffect, useRef} from "react";
import {useRouter} from "next/navigation";
import {ArrowRight} from "@gravity-ui/icons";
import gsap from "gsap";
import {Button} from "@/registry/default/ui/button";

function HeroUIIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-6 w-[18px]"
      fill="none"
      height="26"
      viewBox="0 0 32 44"
      width="18"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.677734 11.3847V24.0405C0.677734 24.6387 0.985209 25.1946 1.49107 25.5109L10.1195 30.9067C11.2693 31.6257 12.7586 30.796 12.7586 29.4363V18.7981C12.7586 18.186 13.0803 17.6194 13.605 17.3074L18.8683 14.1785V41.4437C18.8683 42.7988 20.3486 43.6293 21.4988 42.9195L30.4044 37.4229C30.9152 37.1076 31.2264 36.549 31.2264 35.9471V9.76484C31.2264 8.41634 29.759 7.58483 28.6085 8.28139L18.8683 14.1785V2.55643C18.8683 1.21158 17.408 0.379537 16.2574 1.06878L1.51927 9.89703C0.997365 10.2097 0.677734 10.7747 0.677734 11.3847Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function HeroActions() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    const description = container.querySelector("[data-hero-description]");
    const button = container.querySelector("[data-hero-button]");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    gsap.set(button, {
      transformOrigin: "50% 50%",
      x: 0,
      y: 0,
    });

    if (reduceMotion) {
      gsap.set([description, button], {opacity: 1});
      return;
    }

    const intro = gsap
      .timeline({delay: 0.12})
      .fromTo(
        description,
        {
          opacity: 0,
          y: 10,
        },
        {
          duration: 0.46,
          ease: "power3.out",
          opacity: 1,
          y: 0,
        },
      )
      .fromTo(
        button,
        {
          opacity: 0,
          scale: 0.94,
        },
        {
          duration: 0.28,
          ease: "back.out(2.4)",
          opacity: 1,
          scale: 1,
        },
        "-=0.3",
      );

    return () => {
      intro.kill();
    };
  }, []);

  const openComponents = () => {
    window.setTimeout(() => {
      router.push("/components");
    }, 320);
  };

  return (
    <div ref={containerRef} className="flex flex-col items-center">
      <p data-hero-description className="mt-4 flex max-w-xl flex-wrap items-center justify-center gap-x-1.5 gap-y-2 text-balance text-sm leading-7 text-muted sm:text-base">
        <span>A playful React UI library inspired by</span>
        <a
          aria-label="yui540 on X"
          className="group relative inline-flex translate-y-[2px] items-center text-foreground transition-transform hover:scale-110"
          href="https://x.com/yui540"
          rel="noreferrer"
          target="_blank"
        >
          <span className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 rounded-md bg-foreground px-2 py-1 text-xs font-medium whitespace-nowrap text-background opacity-0 transition-opacity group-hover:opacity-100">
            yui540
          </span>
          <img
            alt="yui540"
            className="size-6 rounded-full border border-border"
            height="24"
            src="https://pbs.twimg.com/profile_images/1998260440758140928/Yw4oQOjY_400x400.jpg"
            width="24"
          />
        </a>
        <span className="text-muted/70">and</span>
        <a
          aria-label="HeroUI"
          className="group relative inline-flex translate-y-[2px] items-center text-foreground transition-transform hover:scale-110"
          href="https://heroui.com/"
          rel="noreferrer"
          target="_blank"
        >
          <span className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 rounded-md bg-foreground px-2 py-1 text-xs font-medium whitespace-nowrap text-background opacity-0 transition-opacity group-hover:opacity-100">
            HeroUI
          </span>
          <HeroUIIcon />
        </a>
      </p>
      <div
        data-hero-button
        className="mt-6 inline-flex origin-center [transform-origin:50%_50%]"
      >
        <Button className="h-12 gap-2 px-6 text-base [--button-bg-hover:var(--button-bg)]" onPress={openComponents}>
          Get started
          <ArrowRight className="size-4" aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
}
