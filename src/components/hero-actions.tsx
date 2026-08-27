"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";

import { Button } from "@/components/ui/button";

export function HeroActions() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const description = container.querySelector("[data-hero-description]");
    const button = container.querySelector("[data-hero-button]");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set([description, button], { opacity: 1 });
      return;
    }

    const intro = gsap.timeline({ delay: 0.12 })
      .fromTo(description, { opacity: 0, y: 10 }, { duration: 0.46, ease: "power3.out", opacity: 1, y: 0 })
      .fromTo(button, { opacity: 0, scale: 0.94 }, { duration: 0.28, ease: "back.out(2.4)", opacity: 1, scale: 1 }, "-=0.3");

    return () => {
      intro.kill();
    };
  }, []);

  return (
    <div ref={containerRef} className="flex flex-col items-center">
      <p data-hero-description className="mt-4 max-w-xl text-balance text-sm text-muted-foreground sm:text-base">
        A playful React UI library with polished, accessible components that feel good to use.
      </p>
      <div data-hero-button className="mt-6 inline-flex">
        <Button onClick={() => router.push("/components")} size="lg">
          Get started
          <ArrowRight className="size-4" aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
}
