import type { Metadata } from "next";
import { JellyBun } from "@/components/JellyBun";
import CopyButton from "@/components/CopyButton";
import BentoGrid from "@/components/BentoGrid";
import { REGISTRY_REPO } from "@/lib/components";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

const INSTALL_COMMAND = `npx shadcn@latest add ${REGISTRY_REPO}/<component-name>`;

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-5xl">
      <section className="flex flex-col items-center pb-16 text-center">
        <div className="flex w-full flex-col items-center">
          <h1 className="max-w-4xl font-runde text-4xl font-bold leading-tight sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="block">Components with</span>
            <span className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 sm:gap-x-3">
              <span>a little</span>{" "}
              <JellyBun
                variant="primary"
                className="size-10 shrink-0 sm:size-16 md:size-20 lg:size-24"
              />
              <span>cuteness</span>
            </span>
          </h1>

          <p className="mt-5 max-w-md md:text-lg font-medium">
            A set of unique and animated React components you can install with
            one command.
          </p>

          <div className="mt-7 flex w-full justify-center">
            <CopyButton
              value={INSTALL_COMMAND}
              label="Copy install command"
              className="h-12 w-full max-w-sm flex-row-reverse justify-between gap-3 rounded-2xl border-0 bg-card/75 px-4 text-foreground shadow-sm ring-1 ring-foreground/[0.03] hover:bg-card/75 hover:text-foreground sm:w-fit sm:max-w-full sm:justify-start sm:px-5"
              iconClassName="size-4"
            >
              <code className="min-w-0 truncate whitespace-nowrap text-left font-mono text-xs font-semibold sm:text-sm">
                npx shadcn@latest add {REGISTRY_REPO}
                <span className="font-normal text-muted-foreground">
                  /&lt;component-name&gt;
                </span>
              </code>
            </CopyButton>
          </div>
        </div>
      </section>
      <BentoGrid />
    </div>
  );
}
