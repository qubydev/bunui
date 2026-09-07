export default function PreviewFallback() {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-popover dark:bg-muted">
      <div className="absolute inset-x-[-25%] bottom-[-40%] top-1/4 bg-primary/20 dark:bg-primary/40" />
      <span className="relative rounded-full bg-muted px-3.5 py-1.5 font-runde text-xs font-medium text-muted-foreground shadow-inner dark:bg-popover/10">
        Recording soon
      </span>
    </div>
  );
}
