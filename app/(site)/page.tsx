import type { Metadata } from "next";
import { JellyBun } from "@/components/JellyBun";
import CopyButton from "@/components/CopyButton";
import BentoGrid from "@/components/BentoGrid";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { REGISTRY_REPO } from "@/lib/components";
import { SITE_DESCRIPTION, SITE_TAGLINE } from "@/lib/site";
import {
  absoluteUrl,
  SITE_FAQS,
  SITE_OG_IMAGE,
  SITE_TWITTER_IMAGE,
} from "@/lib/seo";

export const metadata: Metadata = {
  title: SITE_TAGLINE,
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: SITE_TAGLINE,
    description: SITE_DESCRIPTION,
    url: absoluteUrl("/"),
    images: [
      {
        url: absoluteUrl(SITE_OG_IMAGE),
        width: 1200,
        height: 630,
        alt: "Bun UI animated React components",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TAGLINE,
    description: SITE_DESCRIPTION,
    images: [absoluteUrl(SITE_TWITTER_IMAGE)],
  },
};

const INSTALL_COMMAND = `npx shadcn@latest add ${REGISTRY_REPO}/<component-name>`;

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-5xl">
      <section className="flex flex-col items-center pb-16 text-center">
        <div className="flex w-full flex-col items-center">
          <h1 className="max-w-4xl font-runde text-4xl font-bold leading-tight sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="block">Components with</span>
            <span className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 sm:gap-x-3">
              <span>a little</span>{" "}
              <JellyBun
                variant="primary"
                className="size-10 shrink-0 sm:size-16 md:size-20 lg:size-24"
              />
              <span>cuteness</span>
            </span>
          </h1>

          <p className="mt-5 max-w-md md:text-lg font-medium">
            A set of unique and animated React components you can install with
            one command.
          </p>

          <div className="mt-7 flex w-full justify-center">
            <CopyButton
              value={INSTALL_COMMAND}
              label="Copy install command"
              className="h-12 w-full max-w-sm flex-row-reverse justify-between gap-3 rounded-2xl border border-border bg-popover/90 px-4 text-foreground shadow-none ring-1 ring-foreground/[0.04] transition-[background-color,border-color] hover:border-foreground/10 hover:bg-muted/60 hover:text-foreground sm:w-fit sm:max-w-full sm:justify-start sm:px-5"
              iconClassName="size-4"
            >
              <code className="min-w-0 truncate whitespace-nowrap text-left font-mono text-xs font-semibold sm:text-sm">
                npx shadcn@latest add {REGISTRY_REPO}
                <span className="font-normal text-muted-foreground">
                  /&lt;component-name&gt;
                </span>
              </code>
            </CopyButton>
          </div>
        </div>
      </section>
      <BentoGrid />
      <section className="pt-16 sm:pt-20 lg:pt-24" aria-labelledby="faq-title">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            id="faq-title"
            className="text-balance font-runde text-2xl font-semibold tracking-tight sm:text-3xl"
          >
            Frequently asked
          </h2>

          <Accordion
            type="single"
            collapsible
            className="mt-7 flex flex-col gap-3 text-left"
          >
            {SITE_FAQS.map((item, index) => (
              <AccordionItem
                key={item.question}
                value={`faq-${index}`}
                className="group rounded-2xl border-0 bg-card/75 px-4 shadow-sm ring-1 ring-foreground/[0.03] transition-colors duration-300 ease-out hover:bg-muted/70 data-[state=open]:bg-popover/85 sm:px-5"
              >
                <AccordionTrigger className="py-4 font-runde text-base font-semibold text-foreground hover:no-underline [&>svg]:text-primary [&>svg]:transition-transform [&>svg]:duration-300 [&>svg]:ease-out">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="pb-5 pr-8 text-sm font-medium leading-6 text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  );
}
