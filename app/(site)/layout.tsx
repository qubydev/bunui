import { pagePaddingClassName } from "@/lib/page-layout";
import { cn } from "@/lib/utils";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main
      className={cn("min-h-screen overflow-x-hidden", pagePaddingClassName)}
    >
      {children}
    </main>
  );
}
