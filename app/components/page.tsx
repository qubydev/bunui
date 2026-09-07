import type { Metadata } from "next";
import ComponentCard from "@/components/gallery/ComponentCard";
import { components } from "@/lib/components";
import { SITE_KEYWORDS } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Components",
  description:
    "Browse every Bun UI component in action. Components are built with Tailwind CSS and Motion, then installed with the shadcn CLI.",
  keywords: SITE_KEYWORDS,
  alternates: {
    canonical: "/components",
  },
};

export default function ComponentsIndexPage() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-5 pb-16 pt-32 sm:px-6 md:pt-40">
        {components.length === 0 ? (
          <div className="mx-auto flex min-h-[50vh] max-w-lg flex-col items-center justify-center text-center">
            <h1 className="font-runde text-2xl font-bold tracking-tight sm:text-3xl">
              Components are coming soon.
            </h1>
            <p className="mt-3 text-sm font-medium leading-6 text-muted-foreground sm:text-base">
              This page is temporary while the first Bun UI components are
              being prepared.
            </p>
          </div>
        ) : (
          <section className="mt-2">
            <h1 className="font-runde text-2xl font-semibold tracking-tight sm:text-3xl">
              All components
            </h1>

            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {components.map((item) => (
                <ComponentCard key={item.href} item={item} />
              ))}
            </div>
          </section>
        )}
    </main>
  );
}
