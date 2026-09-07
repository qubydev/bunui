import type { Metadata } from "next";
import Footer from "@/components/Footer";
import ComponentCard from "@/components/gallery/ComponentCard";
import GooeyNavbar from "@/components/GooeyNavbar";
import { components, gallerySections } from "@/lib/components";
import { fetchStarCount } from "@/lib/github";
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

export default async function ComponentsIndexPage() {
  const stars = await fetchStarCount();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(componentsJsonLd()) }}
      />
      <GooeyNavbar stars={stars} />

      <main className="mx-auto w-full max-w-6xl flex-1 px-5 pb-16 pt-32 sm:px-6 md:pt-40">
        <header className="flex flex-col items-center gap-3 text-center">
          <h1 className="max-w-2xl text-balance font-runde text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
            {components.length} components
          </h1>
          <p className="max-w-lg text-balance text-sm font-medium text-muted-foreground sm:text-base">
            Bun UI is ready for its first component. Add an item to the
            registry, build it, and it will appear here.
          </p>
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
                <span className="text-[#FC4C01]">[</span>
                {section.items.length}
                <span className="text-[#FC4C01]">]</span>
              </span>
            </h2>

            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {section.items.map((item) => (
                <ComponentCard key={item.href} item={item} />
              ))}
            </div>
          </section>
        ))}

        {gallerySections.length === 0 && (
          <div className="mt-12 rounded-2xl border border-dashed border-border p-10 text-center">
            <p className="font-runde text-lg font-semibold">
              No components yet
            </p>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
              Add your first file in components/ui, register it in
              registry.json, then run npm run registry:build.
            </p>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
