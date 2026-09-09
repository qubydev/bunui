import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import ComponentCard from "@/components/gallery/ComponentCard";
import { components } from "@/lib/components";
import {
  absoluteUrl,
  componentsJsonLd,
  SITE_KEYWORDS,
  SITE_OG_IMAGE,
} from "@/lib/seo";

export const metadata: Metadata = {
  title: "Components",
  description:
    "Browse every Bun UI component in action. Components are built with Tailwind CSS and Motion, then installed with the shadcn CLI.",
  keywords: SITE_KEYWORDS,
  alternates: {
    canonical: "/components",
  },
  openGraph: {
    title: "Bun UI Components",
    description:
      "Browse animated React components built with Tailwind CSS, Motion, and the shadcn CLI.",
    url: absoluteUrl("/components"),
    images: [
      {
        url: absoluteUrl(SITE_OG_IMAGE),
        width: 1200,
        height: 630,
        alt: "Bun UI components gallery",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bun UI Components",
    description:
      "Browse animated React components built with Tailwind CSS, Motion, and the shadcn CLI.",
    images: [absoluteUrl(SITE_OG_IMAGE)],
  },
};

export default function ComponentsIndexPage() {
  return (
    <div className="mx-auto w-full max-w-6xl">
      <JsonLd data={componentsJsonLd()} />
      {components.length === 0 ? (
        <div className="mx-auto flex min-h-[50vh] max-w-lg flex-col items-center justify-center text-center">
          <h1 className="font-runde text-2xl font-bold tracking-tight sm:text-3xl">
            Components are coming soon.
          </h1>
          <p className="mt-3 text-sm font-medium leading-6 text-muted-foreground sm:text-base">
            This page is temporary while the first Bun UI components are being
            prepared.
          </p>
        </div>
      ) : (
        <section>
          <h1 className="font-runde text-2xl font-semibold tracking-tight sm:text-3xl">
            All components
          </h1>

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {components.map((item) => (
              <ComponentCard key={item.href} item={item} autoPlay />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
