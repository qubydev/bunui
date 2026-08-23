"use client";

import {type CSSProperties, useEffect, useRef} from "react";
import gsap from "gsap";
import {cn} from "@/utils/cn";

const titleStyle = {
  fontFamily: "var(--font-fredoka)",
} satisfies CSSProperties;

const squishLetter = (letter: HTMLSpanElement) => {
  gsap.to(letter, {
    duration: 0.22,
    ease: "back.out(2.8)",
    scaleX: 1.08,
    scaleY: 0.82,
    y: 6,
  });
};

const unsquishLetter = (letter: HTMLSpanElement) => {
  gsap.to(letter, {
    duration: 0.42,
    ease: "elastic.out(1, 0.48)",
    scaleX: 1,
    scaleY: 1,
    y: 0,
  });
};

function AnimatedLetters({children}: {children: string}) {
  return (
    <>
      {Array.from(children).map((letter, index) => {
        const isSpace = letter === " ";

        return (
          <span
            // The text is static, so index keys keep the letter animation mapping stable.
            key={`${letter}-${index}`}
            className="hero-title-letter inline-block origin-bottom"
            onPointerEnter={(event) => {
              if (!isSpace) {
                squishLetter(event.currentTarget);
              }
            }}
            onPointerLeave={(event) => {
              if (!isSpace) {
                unsquishLetter(event.currentTarget);
              }
            }}
          >
            {isSpace ? "\u00A0" : letter}
          </span>
        );
      })}
    </>
  );
}

export function HeroTitle({className}: {className?: string}) {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const title = titleRef.current;

    if (!title) {
      return;
    }

    const letters = title.querySelectorAll(".hero-title-letter");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      gsap.set(letters, {opacity: 1});
      return;
    }

    const intro = gsap.fromTo(
      letters,
      {
        opacity: 0,
        rotate: () => gsap.utils.random(-8, 8),
        scaleY: 0.72,
        y: 18,
      },
      {
        duration: 0.72,
        ease: "elastic.out(1, 0.62)",
        opacity: 1,
        rotate: 0,
        scaleY: 1,
        stagger: {
          amount: 0.48,
          from: "center",
        },
        y: 0,
      },
    );

    return () => {
      intro.kill();
    };
  }, []);

  return (
    <h1
      ref={titleRef}
      aria-label="Cute by default. Smooth by design."
      className={cn(
        "text-4xl font-semibold tracking-normal text-foreground sm:text-5xl lg:mt-4 lg:text-6xl",
        className,
      )}
      style={titleStyle}
    >
      <span aria-hidden="true" className="block leading-[0.94]">
        <AnimatedLetters>Cute by default.</AnimatedLetters>
      </span>
      <span aria-hidden="true" className="block leading-[0.94] text-muted/70">
        <AnimatedLetters>Smooth by design.</AnimatedLetters>
      </span>
    </h1>
  );
}
