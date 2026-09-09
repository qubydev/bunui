"use client";

import { StreakGrid, type StreakGridDay } from "@/components/ui/streak-grid";
import { TooltipProvider } from "@/components/ui/tooltip";

function makeDemoData(): StreakGridDay[] {
  const start = new Date(2025, 8, 10);
  const days = 365;

  return Array.from({ length: days }, (_, index) => {
    const date = new Date(start);
    date.setDate(start.getDate() + index);

    const wave = Math.sin(index * 0.37) + Math.cos(index * 0.11);
    const pulse = index % 41 === 0 ? 8 : index % 17 === 0 ? 5 : 0;
    const quiet = index % 13 === 0 || index % 19 === 0;
    const count = quiet
      ? 0
      : Math.max(0, Math.round((wave + 2) * 2.2 + pulse - 2));

    return {
      date,
      count,
      label: count === 0 ? "No activity" : `${count} activities`,
    };
  });
}

const demoData = makeDemoData();

export default function StreakGridDemo() {
  return (
    <TooltipProvider delayDuration={150}>
      <div className="flex h-full min-w-0 items-center justify-center px-4 sm:px-6">
        <div className="w-full max-w-4xl min-w-0">
          <StreakGrid data={demoData} itemLabel="activities" weekStartsOn={1} />
        </div>
      </div>
    </TooltipProvider>
  );
}
