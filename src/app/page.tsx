import Link from "next/link";
import {ArrowRight} from "@gravity-ui/icons";
import {Button} from "@bunui/react";
import {buttonVariants} from "@bunui/styles";
import {JellyBun} from "@/components/jelly-bun";
import {Topbar} from "@/components/topbar";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Topbar />

      <main className="mx-auto flex min-h-[calc(100vh-3.5rem)] w-full max-w-[1400px] flex-col px-4 md:px-6">
        <section className="z-10 flex min-h-0 flex-1 flex-col items-center pt-12 text-center">
          <div className="mx-auto flex max-w-2xl flex-col items-center justify-center">
            <JellyBun className="size-28 text-foreground sm:size-36" />
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:mt-4 lg:text-5xl">
              Cute by default. <div className="text-muted/70">Smooth by design.</div>
            </h1>
            <p className="mt-4 text-balance text-muted md:text-lg">
              BunUI gives you animated React components with soft interactions, accessible foundations, and the kind of polish that makes interfaces feel alive.
            </p>
            <Link
              className={buttonVariants({class:"group mt-6 h-12 gap-2 px-6 text-base", variant:"primary"})}
              href="/components/button"
            >
              Get started
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          </div>

          <div className="flex min-h-0 w-full flex-1 flex-col py-6 lg:py-10">
            <div className="relative flex min-h-[360px] w-full flex-1 items-center justify-center overflow-hidden rounded-3xl border border-border bg-surface p-8 shadow-sm">
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Button>Button</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
