export default function PreviewFallback() {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-white dark:bg-neutral-950">
      <div className="absolute inset-x-[-25%] bottom-[-40%] top-1/4 bg-[radial-gradient(circle_at_50%_100%,rgba(252,76,1,0.22),transparent_65%)] dark:bg-[radial-gradient(circle_at_50%_100%,rgba(252,76,1,0.4),transparent_65%)]" />
      <span className="relative rounded-full bg-black/[0.04] px-3.5 py-1.5 font-runde text-xs font-medium text-neutral-500 shadow-[inset_0_1px_0_0_rgba(0,0,0,0.06)] dark:bg-white/[0.06] dark:text-white/60 dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12)]">
        Recording soon
      </span>
    </div>
  );
}
