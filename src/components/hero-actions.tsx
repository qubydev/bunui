"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {ArrowRight} from "lucide-react";
import gsap from "gsap";
import {HeroUIIcon} from "@/components/heroui-icon";
import { Button } from "@/registry/default/ui/button";

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
      gsap.set([description, button], { opacity: 1 });
      return;
    }

    const intro = gsap
      .timeline({ delay: 0.12 })
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
      <p data-hero-description className="mt-2 md:mt-4 flex max-w-xl flex-wrap items-center justify-center gap-x-1.5 gap-y-2 text-balance text-sm leading-7 text-muted sm:text-base">
        <span>A playful React UI library inspired by</span>
        <a
          aria-label="yui540 on X"
          className="group relative inline-flex items-center text-foreground transition-transform hover:scale-110"
          href="https://x.com/yui540"
          rel="noreferrer"
          target="_blank"
        >
          <img
            alt="yui540"
            className="size-6 rounded-full border"
            height="24"
            src="/yui540-avatar.jpg"
            width="24"
          />
        </a>
        <span aria-hidden="true" className="text-muted">
          &
        </span>
        <a
          aria-label="HeroUI"
          className="group relative inline-flex items-center text-foreground transition-transform hover:scale-110"
          href="https://www.heroui.com/"
          rel="noreferrer"
          target="_blank"
        >
          <HeroUIIcon className="size-6" />
        </a>
      </p>
      <div
        data-hero-button
        className="mt-6 inline-flex"
      >
        <Button className="h-12 gap-2 px-6 text-base" onClick={openComponents}>
          Get started
          <ArrowRight className="size-4" aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
}





