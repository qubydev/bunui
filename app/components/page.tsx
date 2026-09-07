import type { Metadata } from "next";
import ComponentCard from "@/components/gallery/ComponentCard";
import { components, gallerySections } from "@/lib/components";
import { SITE_KEYWORDS, componentsJsonLd } from "@/lib/seo";

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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(componentsJsonLd()) }}
      />

      <main className="mx-auto w-full max-w-6xl flex-1 px-5 pb-16 pt-32 sm:px-6 md:pt-40">
        {gallerySections.length === 0 ? (
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
          <>
            <header className="flex flex-col items-center gap-3 text-center">
              <h1 className="max-w-2xl text-balance font-runde text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
                {components.length} components
              </h1>
            </header>

            {gallerySections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="mt-14 scroll-mt-28 first:mt-10"
              >
                <h2 className="font-runde text-lg font-semibold tracking-tight sm:text-xl">
                  {section.label}{" "}
                  <span className="text-muted-foreground">
                    <span className="text-primary">[</span>
                    {section.items.length}
                    <span className="text-primary">]</span>
                  </span>
                </h2>

                <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {section.items.map((item) => (
                    <ComponentCard key={item.href} item={item} />
                  ))}
                </div>
              </section>
            ))}
          </>
        )}
      </main>
    </>
  );
}
