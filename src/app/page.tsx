import {HeroActions} from "@/components/hero-actions";
import {HeroTitle} from "@/components/hero-title";
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
            <HeroTitle />
            <HeroActions />
          </div>

        </section>
      </main>
    </div>
  );
}
