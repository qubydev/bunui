import {HeroActions} from "@/components/hero-actions";
import {HeroTitle} from "@/components/hero-title";
import {JellyBun} from "@/components/jelly-bun";
import {Topbar} from "@/components/topbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Topbar />
      <main className="flex min-h-[calc(100vh-3.5rem)] w-full flex-col px-4 md:px-6">
        <section className="flex min-h-0 flex-1 flex-col items-center pt-12 text-center sm:pt-16">
          <div className="mx-auto flex max-w-2xl flex-col items-center justify-center">
            <JellyBun className="size-28 text-foreground sm:size-36" size={144} />
            <HeroTitle />
            <HeroActions />
          </div>
        </section>
      </main>
    </div>
  );
}
