"use client";

import { motion, useReducedMotion } from "motion/react";

const spring = { type: "spring", stiffness: 300, damping: 22 } as const;

const STEP = 0.09;

const rise = {
  hidden: { y: 18, filter: "blur(4px)" },
  shown: { y: 0, filter: "blur(0px)" },
};

export default function HeroIntro({
  headline,
  sub,
  children,
}: {
  headline: string;
  sub: string;
  children: React.ReactNode;
}) {
  const reduceMotion = useReducedMotion();

  const step = (index: number) =>
    reduceMotion ? { duration: 0 } : { ...spring, delay: index * STEP };

  return (
    <>
      <motion.h1
        initial={reduceMotion ? false : rise.hidden}
        animate={rise.shown}
        transition={step(0)}
        className="max-w-4xl text-balance font-runde text-4xl font-bold tracking-tight text-black dark:text-white sm:text-5xl md:text-6xl lg:text-7xl"
      >
        {headline}
      </motion.h1>

      <motion.p
        initial={reduceMotion ? false : rise.hidden}
        animate={rise.shown}
        transition={step(1)}
        className="max-w-xl font-medium text-black/60 dark:text-white/60 sm:text-lg"
      >
        {sub}
      </motion.p>

      <motion.div
        initial={reduceMotion ? false : rise.hidden}
        animate={rise.shown}
        transition={step(2)}
      >
        {children}
      </motion.div>
    </>
  );
}
