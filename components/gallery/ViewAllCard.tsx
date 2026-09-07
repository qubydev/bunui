import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function ViewAllCard({
  count,
  className,
}: {
  count: number;
  className?: string;
}) {
  return (
    <Link
      href="/components"
      className={cn(
        "group relative flex min-h-45 flex-col justify-between overflow-hidden rounded-[32px] bg-[#FC4C01] p-6 text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.25)] transition-colors duration-200 ease-out hover:bg-[#e04300]",
        className,
      )}
      style={{ cornerShape: "squircle" } as React.CSSProperties}
    >
      <Image
        src="/logos/Bunui.svg"
        alt=""
        aria-hidden="true"
        width={320}
        height={307}
        className="pointer-events-none absolute -bottom-20 -right-20 h-80 w-80 opacity-25 [filter:brightness(0)_invert(1)]"
      />

      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        xmlns="http://www.w3.org/2000/svg"
        className="relative h-8 w-8 transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none"
        aria-hidden="true"
      >
        <path d="M7 17 17 7M8 7h9v9" />
      </svg>

      <span className="relative font-runde text-2xl font-bold tracking-tight">
        View all
        <br />
        {count} components
      </span>
    </Link>
  );
}
