import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function ComponentsPage() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col px-4">
      <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-3xl mb-1 sm:mb-3">All Components</h1>
      <p>
        Explore the full list of components available in the library.
      </p>

      <section className="py-4 mt-4" aria-labelledby="buttons-heading">
        <div className="grid grid-cols-1 gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col gap-2">
            <div className="order-2">
              <Link className="text-sm font-medium text-foreground hover:underline" href="/components/button">
                Button
              </Link>
            </div>
            <Link
              href="/components/button"
              className="order-1 flex aspect-[3/2] items-center justify-center overflow-hidden rounded-lg border bg-background p-5 transition-colors hover:bg-muted/40"
            >
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Button size="sm">Primary</Button>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
