import Link from "next/link";
import {Button} from "@bunui/react";
import {buttonVariants} from "@bunui/styles";
import {Topbar} from "@/components/topbar";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Topbar />

      <main className="mx-auto flex min-h-[calc(100vh-3.5rem)] w-full max-w-[1400px] flex-col px-4 md:px-6">
        <section className="z-10 flex min-h-0 flex-1 flex-col items-center pt-12 text-center">
          <div className="mx-auto flex max-w-2xl flex-col items-center justify-center">
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:mt-4 lg:text-5xl">
              Beautiful by default. <div className="text-muted/70">Customizable by design.</div>
            </h1>
            <p className="mt-4 text-balance text-muted md:text-lg">
              BunUI is a modern React UI library built to help you move fast, stay consistent, and deliver delightful user experiences.
            </p>
            <div className="mt-5 flex gap-3">
              <Link className={buttonVariants({variant:"primary"})} href="/components/button">Get started</Link>
              <Link className={buttonVariants({variant:"outline"})} href="/components">View components</Link>
            </div>
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