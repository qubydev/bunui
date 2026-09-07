"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import { DescriptionPanel } from "../Description/DescriptionPanel";
import { cn } from "@/lib/utils";

export default function DesktopShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [navOpen, setNavOpen] = useState(true);
  const [infoOpen, setInfoOpen] = useState(false);

  return (
    <div className="relative h-full">
      <Sidebar open={navOpen} setOpen={setNavOpen} />
      <DescriptionPanel open={infoOpen} setOpen={setInfoOpen} />

      <div
        className={cn(
          "h-full transition-[padding] duration-300 ease-out",
          navOpen ? "pl-72" : "pl-0",
          infoOpen ? "pr-144" : "pr-0",
        )}
      >
        <div
          className="relative z-0 h-full rounded-4xl bg-card p-4"
          style={{ cornerShape: "squircle" } as React.CSSProperties}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
