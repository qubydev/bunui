"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Star } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { GithubLogo, XLogo } from "@/components/logos";
import { REGISTRY_HOMEPAGE } from "@/lib/components";
import {
  formatStars,
  getCachedGithubStars,
  getGithubStars,
} from "@/lib/github-stars-client";

const ease = [0.16, 1, 0.3, 1] as const;
const darkCardSurface = "bg-foreground text-background shadow-sm";
const tweetCardVariants = {
  initial: { opacity: 0, y: 12, filter: "blur(8px)" },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.38,
      ease,
      staggerChildren: 0.05,
      delayChildren: 0.04,
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    filter: "blur(8px)",
    transition: { duration: 0.24, ease },
  },
};
const tweetItemVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.32, ease } },
  exit: { opacity: 0, y: -6, transition: { duration: 0.18, ease } },
};
const testimonials = [
  {
    name: "Giorgio",
    handle: "@iiamgio",
    avatarUrl: "https://unavatar.io/x/iiamgio",
    url: "https://x.com/iiamgio/status/2092449849623113976",
    text: "looks good! waiting for sveltekit :))",
  },
  {
    name: "coffee",
    handle: "@coffee_0708",
    avatarUrl: "https://unavatar.io/x/coffee_0708",
    url: "https://x.com/coffee_0708/status/2091744965047238716",
    text: "nice nice ✨",
  },
  {
    name: "Shumoshita",
    handle: "@ShumoshitaLNQ",
    avatarUrl: "https://unavatar.io/x/ShumoshitaLNQ",
    url: "https://x.com/ShumoshitaLNQ/status/2092318200314929295",
    text: "Omg loved it",
  },
  {
    name: "Praha",
    handle: "@Praha37v",
    avatarUrl: "https://unavatar.io/x/Praha37v",
    url: "https://x.com/Praha37v/status/2076178666112118802",
    text: "Cool 👌",
  },
];

type AnalyticsStats = {
  components: number;
  visitors: number;
  views: number;
};

function formatCompactCount(value: number) {
  if (value >= 1000) {
    return new Intl.NumberFormat("en", {
      maximumFractionDigits: 1,
      notation: "compact",
    })
      .format(value)
      .toUpperCase();
  }

  return value.toLocaleString("en");
}

function HoverCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) {
  return (
    <motion.div className={`relative ${className}`}>{children}</motion.div>
  );
}

function CoverImageCard() {
  return (
    <HoverCard className="group relative min-h-[340px] min-w-0 overflow-hidden rounded-2xl bg-card/75 shadow-sm ring-1 ring-foreground/[0.03] sm:min-h-[420px] md:col-span-7 md:row-span-2">
      <Image
        src="/cover_image1.png"
        alt="Bun UI cover preview"
        fill
        sizes="(min-width: 768px) 58vw, 100vw"
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.025]"
        priority
      />
    </HoverCard>
  );
}

function NewsletterCard() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const resetTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) window.clearTimeout(resetTimerRef.current);
    };
  }, []);

  return (
    <HoverCard className="flex min-h-[202px] min-w-0 flex-col justify-between rounded-2xl bg-card/75 p-4 shadow-sm ring-1 ring-foreground/[0.03] sm:p-6 md:col-span-5">
      <div>
        <p className="font-runde text-2xl font-semibold tracking-tight sm:text-3xl">
          Get the good stuff.
        </p>
        <p className="mt-1 max-w-sm text-sm leading-relaxed text-muted-foreground">
          New components, tiny experiments, and Bun UI updates — occasionally.
        </p>
      </div>

      <form
        className="mt-5 flex flex-col gap-2 rounded-[1.75rem] bg-background p-1.5 ring-1 ring-border/80 sm:flex-row sm:items-center"
        onSubmit={(event) => {
          event.preventDefault();
          if (!email.trim()) return;

          if (resetTimerRef.current) window.clearTimeout(resetTimerRef.current);

          setEmail("");
          setSubscribed(true);
          resetTimerRef.current = window.setTimeout(() => {
            setSubscribed(false);
            resetTimerRef.current = null;
          }, 1500);
        }}
      >
        <input
          type="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (subscribed) {
              if (resetTimerRef.current)
                window.clearTimeout(resetTimerRef.current);
              resetTimerRef.current = null;
              setSubscribed(false);
            }
          }}
          placeholder="you@example.com"
          aria-label="Email address"
          className="min-w-0 flex-1 rounded-full bg-transparent px-3 py-2.5 text-sm outline-none placeholder:text-muted-foreground/75 sm:px-4"
        />
        <Button type="submit" size="sm" className="h-10 w-full px-5 sm:w-auto">
          {subscribed ? "Subscribed!" : "Subscribe"}
        </Button>
      </form>
    </HoverCard>
  );
}

function RotatingTestimonialCard() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setActive((current) => (current + 1) % testimonials.length);
    }, 4800);

    return () => window.clearTimeout(timer);
  }, [active]);

  const testimonial = testimonials[active];

  return (
    <motion.figure
      className={`relative flex min-h-[202px] min-w-0 flex-col rounded-2xl p-4 sm:p-6 md:col-span-5 ${darkCardSurface}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={testimonial.handle}
          variants={tweetCardVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="flex min-h-0 flex-1 flex-col"
        >
          <div className="flex min-w-0 items-start justify-between gap-3">
            <motion.a
              href={testimonial.url.replace(/\/status\/.*/, "")}
              target="_blank"
              rel="noreferrer"
              variants={tweetItemVariants}
              className="group/profile min-w-0"
            >
              <motion.img
                src={testimonial.avatarUrl}
                alt={`${testimonial.name} avatar`}
                className="size-9 rounded-full bg-white object-cover"
              />
              <div className="mt-2 min-w-0 text-xs leading-tight">
                <div className="truncate font-semibold group-hover/profile:underline">
                  {testimonial.name}
                </div>
                <div className="mt-0.5 truncate text-background/50">
                  {testimonial.handle}
                </div>
              </div>
            </motion.a>

            <motion.div
              variants={tweetItemVariants}
              aria-hidden="true"
              className="text-background/60"
            >
              <XLogo className="size-5" />
            </motion.div>
          </div>

          <div className="relative mt-5 flex flex-1 items-center">
            <motion.div variants={tweetItemVariants} className="origin-center">
              <blockquote
                cite={testimonial.url}
                className="line-clamp-2 max-w-[34ch] font-runde text-base font-medium leading-relaxed sm:text-lg"
              >
                “{testimonial.text}”
              </blockquote>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="mt-4 flex min-w-0 justify-end">
        <div
          className="flex items-center gap-2"
          aria-label="Testimonial selector"
        >
          {testimonials.map((item, index) => {
            const isActive = index === active;

            return (
              <button
                key={item.handle}
                type="button"
                onClick={() => setActive(index)}
                aria-label={`Show testimonial from ${item.name}`}
                aria-pressed={isActive}
                className="relative h-2 cursor-pointer rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background/40"
              >
                {isActive ? (
                  <span className="relative block h-2 w-9 overflow-hidden rounded-full bg-background/15">
                    <motion.span
                      key={active}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 4.8, ease: "linear" }}
                      className="absolute inset-0 origin-left rounded-full bg-background"
                    />
                  </span>
                ) : (
                  <span className="block size-2 rounded-full bg-background/30 transition-colors duration-200 hover:bg-background/55" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </motion.figure>
  );
}

function GithubCard() {
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
    <motion.a
      href={REGISTRY_HOMEPAGE}
      target="_blank"
      rel="noreferrer"
      className={`group relative flex min-w-0 flex-col justify-between rounded-2xl p-4 sm:p-6 md:col-span-4 ${darkCardSurface}`}
    >
      <div className="flex min-w-0 items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <GithubLogo className="size-7" />
          <p className="min-w-0 truncate font-runde text-lg font-semibold sm:text-xl">
            qubydev/bunui
          </p>
        </div>
        <ArrowUpRight className="size-4 shrink-0 opacity-55 transition-opacity duration-200 group-hover:opacity-100" />
      </div>

      <div className="mt-4">
        <div className="flex items-center gap-2 text-xs font-semibold">
          <Star className="size-3.5" fill="currentColor" />
          <span>{stars == null ? "…" : formatStars(stars)} stars</span>
        </div>
      </div>
    </motion.a>
  );
}

function StatsCard() {
  const recordedRef = useRef(false);
  const [analyticsStats, setAnalyticsStats] =
    useState<AnalyticsStats | null>(null);

  useEffect(() => {
    if (recordedRef.current) return;
    recordedRef.current = true;

    fetch("/api/analytics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ path: window.location.pathname }),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to load analytics stats.");

        return response.json() as Promise<AnalyticsStats>;
      })
      .then(setAnalyticsStats)
      .catch(() => {
        setAnalyticsStats(null);
      });
  }, []);

  const stats = [
    {
      label: "COMPONENTS",
      value: analyticsStats
        ? formatCompactCount(analyticsStats.components)
        : "--",
    },
    {
      label: "VISITORS",
      value: analyticsStats ? formatCompactCount(analyticsStats.visitors) : "--",
    },
    {
      label: "VIEWS",
      value: analyticsStats ? formatCompactCount(analyticsStats.views) : "--",
    },
  ];

  return (
    <div className="grid min-w-0 grid-cols-3 gap-2 sm:gap-3 md:col-span-8">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="min-w-0 rounded-2xl bg-card/75 p-3 shadow-sm ring-1 ring-foreground/[0.03] sm:flex sm:flex-col sm:justify-between sm:p-6"
        >
          <p className="font-runde text-2xl font-semibold tracking-tight min-[380px]:text-3xl sm:text-5xl">
            {stat.value}
          </p>
          <p className="mt-2 truncate text-[9px] font-semibold tracking-[0.08em] text-muted-foreground min-[380px]:text-[10px] sm:mt-0 sm:text-[11px] sm:tracking-[0.18em]">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}

export default function BentoGrid() {
  return (
    <section
      aria-label="Bun UI highlights"
      className="w-full pt-16 sm:pt-20 lg:pt-24"
    >
      <div className="grid min-w-0 gap-3 sm:gap-4 md:grid-cols-12">
        <CoverImageCard />
        <NewsletterCard />
        <RotatingTestimonialCard />
        <GithubCard />
        <StatsCard />
      </div>
    </section>
  );
}
