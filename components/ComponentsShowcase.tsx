import { components } from "@/lib/components";
import ComponentCard from "./gallery/ComponentCard";
import ViewAllCard from "./gallery/ViewAllCard";

export default function ComponentsShowcase() {
  const [hero, ...rest] = components.filter((item) => item.featured);
  if (!hero) return null;

  return (
    <section className="mx-auto w-full max-w-6xl px-5 py-24 sm:px-6 md:py-32">
      <header className="flex flex-col items-center gap-3 text-center">
        <h2 className="max-w-2xl text-balance font-runde text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
          {components.length} Bun UI components
        </h2>
        <p className="max-w-lg text-balance text-sm font-medium text-muted-foreground sm:text-base">
          Just one file for each component. Add it with the shadcn CLI, using
          any package manager you like.
        </p>
      </header>

      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <ComponentCard
          item={hero}
          large
          autoPlay
          className="sm:col-span-2 lg:row-span-2"
        />
        {rest.map((item) => (
          <ComponentCard key={item.href} item={item} autoPlay />
        ))}
        <ViewAllCard
          count={components.length}
          className="sm:col-span-2 lg:col-span-1"
        />
      </div>
    </section>
  );
}
