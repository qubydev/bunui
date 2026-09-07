"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Star } from "lucide-react";
import { JellyBun, type JellyBunMood } from "@/components/JellyBun";
import { GithubLogo, XLogo } from "@/components/logos";
import { REGISTRY_HOMEPAGE } from "@/lib/components";
import {
  formatStars,
  getCachedGithubStars,
  getGithubStars,
} from "@/lib/github-stars-client";

const ease = [0.16, 1, 0.3, 1] as const;
const cardSpring = {
  type: "spring" as const,
  stiffness: 170,
  damping: 23,
  mass: 0.78,
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

function HoverCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) {
  return (
    <motion.div className={`relative ${className}`}>
      {children}
    </motion.div>
  );
}

const bunMoods: { id: JellyBunMood; label: string }[] = [
  { id: "happy", label: "Happy" },
  { id: "love", label: "Loved" },
  { id: "sleepy", label: "Sleepy" },
  { id: "angry", label: "Grumpy" },
];

function BunPlayCard() {
  const [mood, setMood] = useState<JellyBunMood>("happy");

  return (
    <HoverCard className="flex min-h-[340px] min-w-0 flex-col overflow-hidden rounded-2xl bg-card/75 p-4 sm:min-h-[420px] sm:p-6 md:col-span-7 md:row-span-2">
      <div className="grid flex-1 place-items-center">
        <JellyBun
          variant="primary"
          mood={mood}
          interactive={false}
          followCursor
          pressable
          className="size-44 sm:size-60 md:size-64"
        />
      </div>

      <div className="mx-auto grid w-full max-w-xs grid-cols-2 gap-1 rounded-2xl bg-background/70 p-1 sm:flex sm:w-fit sm:max-w-none sm:rounded-full">
        {bunMoods.map((item) => {
          const active = mood === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setMood(item.id)}
              aria-pressed={active}
              className="relative isolate rounded-full px-3 py-2 text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:px-4"
            >
              {active && (
                <motion.span
                  layoutId="bun-mood-active"
                  transition={cardSpring}
                  className="absolute inset-0 -z-10 rounded-full bg-primary"
                />
              )}
              <span className={active ? "text-primary-foreground" : "text-muted-foreground"}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </HoverCard>
  );
}

function NewsletterCard() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <HoverCard className="flex min-h-[202px] min-w-0 flex-col justify-between rounded-2xl bg-card/75 p-4 sm:p-6 md:col-span-5">
      <div>
        <p className="font-runde text-2xl font-semibold tracking-tight sm:text-3xl">Get the good stuff.</p>
        <p className="mt-1 max-w-sm text-sm leading-relaxed text-muted-foreground">
          New components, tiny experiments, and Bun UI updates — occasionally.
        </p>
      </div>

      <form
        className="mt-5 flex flex-col gap-2 sm:flex-row"
        onSubmit={(event) => {
          event.preventDefault();
          if (!email.trim()) return;
          setSubscribed(true);
        }}
      >
        <input
          type="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (subscribed) setSubscribed(false);
          }}
          placeholder="you@example.com"
          aria-label="Email address"
          className="min-w-0 flex-1 rounded-full bg-background px-4 py-2.5 text-sm outline-none ring-1 ring-border transition focus:ring-2 focus:ring-ring"
        />
        <button
          type="submit"
          className="w-full shrink-0 rounded-full bg-foreground px-4 py-2.5 text-sm font-semibold text-background transition-opacity hover:opacity-85 sm:w-auto"
        >
          {subscribed ? "Subscribed" : "Subscribe"}
        </button>
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
      className="relative flex min-h-[202px] min-w-0 flex-col rounded-2xl bg-foreground p-4 text-background sm:p-6 md:col-span-5"
    >
      <div className="flex min-w-0 items-start justify-between gap-3">
        <AnimatePresence mode="wait" initial={false}>
          <motion.a
            key={testimonial.handle}
            href={testimonial.url.replace(/\/status\/.*/, "")}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 6, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -6, filter: "blur(4px)" }}
            transition={{ duration: 0.32, ease }}
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
        </AnimatePresence>

        <div aria-hidden="true" className="text-background/60">
          <XLogo className="size-5" />
        </div>
      </div>

      <div className="relative mt-5 flex flex-1 items-center">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={testimonial.handle}
            initial={{ opacity: 0, y: 6, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -6, filter: "blur(4px)" }}
            transition={{ duration: 0.32, ease }}
            className="origin-center"
          >
            <blockquote
              cite={testimonial.url}
              className="line-clamp-2 max-w-[34ch] font-runde text-base font-medium leading-relaxed sm:text-lg"
            >
              “{testimonial.text}”
            </blockquote>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-4 flex min-w-0 justify-end">
        <div className="flex items-center gap-2" aria-label="Testimonial selector">
          {testimonials.map((item, index) => {
            const isActive = index === active;

            return (
              <button
                key={item.handle}
                type="button"
                onClick={() => setActive(index)}
                aria-label={`Show testimonial from ${item.name}`}
                aria-pressed={isActive}
                className="relative h-2 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background/40"
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
      className="group relative flex min-w-0 flex-col justify-between rounded-2xl bg-foreground p-4 text-background sm:p-6 md:col-span-4"
    >
      <div className="flex min-w-0 items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <GithubLogo className="size-7" />
          <p className="min-w-0 truncate font-runde text-lg font-semibold sm:text-xl">qubydev/bunui</p>
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
  const stats = [
    { label: "COMPONENTS", value: "18" },
    { label: "VISITORS", value: "12.8K" },
    { label: "VIEWS", value: "47.2K" },
  ];

  return (
    <div className="grid min-w-0 grid-cols-3 gap-2 sm:gap-3 md:col-span-8">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="min-w-0 rounded-2xl bg-card/75 p-3 sm:flex sm:flex-col sm:justify-between sm:p-6"
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

export default function TestimonialsSection() {
  return (
    <section
      aria-label="Bun UI highlights"
      className="mx-auto w-full max-w-5xl px-4 pb-20 pt-16 sm:px-6 sm:pb-24 sm:pt-24 lg:px-0 lg:pt-28"
    >
      <div className="grid min-w-0 gap-3 sm:gap-4 md:grid-cols-12">
        <BunPlayCard />
        <NewsletterCard />
        <RotatingTestimonialCard />
        <GithubCard />
        <StatsCard />
      </div>
    </section>
  );
}
