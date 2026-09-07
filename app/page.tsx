import type { Metadata } from "next";
import Image from "next/image";
import GooeyNavbar from "@/components/GooeyNavbar";
import { fetchStarCount } from "@/lib/github";
import HeroCta from "@/components/HeroCta";
import HeroIntro from "@/components/HeroIntro";
import ComponentsShowcase from "@/components/ComponentsShowcase";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default async function Home() {
  const stars = await fetchStarCount();

  return (
    <>
      <section className="relative w-full p-1.5 md:p-2.5">
        <div
          className="relative flex min-h-[min(100svh_-_0.75rem,60rem)] w-full items-center justify-center overflow-hidden rounded-[45px] border border-black/[0.04] bg-[#F5F5F7] dark:border-transparent dark:border-apple dark:bg-[#121212] md:min-h-[min(100svh_-_1.25rem,60rem)]"
          style={{ cornerShape: "squircle" } as React.CSSProperties}
        >
          <GooeyNavbar stars={stars} />

          <Image
            src="/logos/Bunui.svg"
            alt=""
            aria-hidden="true"
            width={860}
            height={824}
            className="pointer-events-none absolute left-1/2 top-[68%] w-[860px] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-[0.05] [filter:brightness(0)] dark:opacity-[0.07] dark:[filter:brightness(0)_invert(1)]"
          />
          <div className="pointer-events-none absolute inset-0 hidden bg-[radial-gradient(120%_75%_at_50%_-5%,rgba(255,255,255,0.07),transparent_60%)] dark:block" />

          <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center justify-center gap-3 px-4 pb-20 pt-28 text-center sm:gap-4 sm:px-6">
            <HeroIntro
              headline="Tasteful Components, Made to Stand Out."
              sub="Bun UI is a free, open-source collection of animated React components. Browse them in action below and install any component with the shadcn CLI."
            >
              <HeroCta />
            </HeroIntro>
          </div>
        </div>
      </section>
      <ComponentsShowcase />
      <Footer />
    </>
  );
}
