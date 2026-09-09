"use client";

import * as React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export type StreakGridDay = {
  date: string | Date;
  count: number;
  label?: string;
  level?: 0 | 1 | 2 | 3 | 4;
};

export type StreakGridResolvedDay = {
  date: Date;
  count: number;
  label?: string;
  level: 0 | 1 | 2 | 3 | 4;
};

export type StreakGridProps = {
  data: StreakGridDay[];
  className?: string;
  weekStartsOn?: 0 | 1;
  emptyLabel?: string;
  itemLabel?: string;
  lessLabel?: string;
  moreLabel?: string;
  showLegend?: boolean;
  showSummary?: boolean;
  showMonthLabels?: boolean;
  cellSize?: number;
  gap?: number;
  formatTooltip?: (day: StreakGridResolvedDay) => React.ReactNode;
  formatSelection?: (day: StreakGridResolvedDay) => React.ReactNode;
};

const LEVEL_CLASSES = [
  "bg-primary/10",
  "bg-primary/30",
  "bg-primary/50",
  "bg-primary/70",
  "bg-primary",
] as const;

function toDate(value: string | Date) {
  if (value instanceof Date) {
    const date = new Date(value);
    date.setHours(0, 0, 0, 0);
    return date;
  }

  const localDate = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (localDate) {
    return new Date(
      Number(localDate[1]),
      Number(localDate[2]) - 1,
      Number(localDate[3]),
    );
  }

  const date = new Date(value);
  date.setHours(0, 0, 0, 0);
  return date;
}

function dateKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function addDays(date: Date, amount: number) {
  const result = new Date(date);
  result.setDate(result.getDate() + amount);
  return result;
}

function startOfWeek(date: Date, weekStartsOn: 0 | 1) {
  const result = new Date(date);
  const offset = (result.getDay() - weekStartsOn + 7) % 7;
  result.setDate(result.getDate() - offset);
  return result;
}

function endOfWeek(date: Date, weekStartsOn: 0 | 1) {
  return addDays(startOfWeek(date, weekStartsOn), 6);
}

function getLevel(count: number, max: number): 0 | 1 | 2 | 3 | 4 {
  if (count <= 0 || max <= 0) return 0;
  const ratio = count / max;
  if (ratio <= 0.25) return 1;
  if (ratio <= 0.5) return 2;
  if (ratio <= 0.75) return 3;
  return 4;
}

export function StreakGrid({
  data,
  className,
  weekStartsOn = 0,
  emptyLabel = "No activity",
  itemLabel = "activities",
  lessLabel = "Less",
  moreLabel = "More",
  showLegend = true,
  showSummary = true,
  showMonthLabels = true,
  cellSize = 12,
  gap = 3,
  formatTooltip,
  formatSelection,
}: StreakGridProps) {
  const [selectedDay, setSelectedDay] =
    React.useState<StreakGridResolvedDay | null>(null);
  const resetTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  const prepared = React.useMemo(() => {
    if (data.length === 0) return null;

    const normalized = data
      .map((item) => ({ ...item, normalizedDate: toDate(item.date) }))
      .filter((item) => !Number.isNaN(item.normalizedDate.getTime()))
      .sort((a, b) => a.normalizedDate.getTime() - b.normalizedDate.getTime());

    if (normalized.length === 0) return null;

    const requestedEnd = normalized[normalized.length - 1].normalizedDate;
    const requestedStart = addDays(requestedEnd, -364);
    const rangeStart = startOfWeek(requestedStart, weekStartsOn);
    const rangeEnd = endOfWeek(requestedEnd, weekStartsOn);
    const byDate = new Map(
      normalized.map((item) => [dateKey(item.normalizedDate), item]),
    );
    const inRange = normalized.filter(
      (item) =>
        item.normalizedDate >= requestedStart &&
        item.normalizedDate <= requestedEnd,
    );
    const maxCount = Math.max(...inRange.map((item) => item.count), 0);

    const weeks: Array<
      Array<StreakGridResolvedDay & { outsideRange: boolean }>
    > = [];

    for (
      let cursor = new Date(rangeStart);
      cursor <= rangeEnd;
      cursor = addDays(cursor, 7)
    ) {
      weeks.push(
        Array.from({ length: 7 }, (_, dayIndex) => {
          const current = addDays(cursor, dayIndex);
          const item = byDate.get(dateKey(current));
          const count = item?.count ?? 0;

          return {
            date: current,
            count,
            label: item?.label,
            level: item?.level ?? getLevel(count, maxCount),
            outsideRange: current < requestedStart || current > requestedEnd,
          };
        }),
      );
    }

    const monthMarkers: Array<{
      label: string;
      column: number;
      key: string;
    }> = [];
    let lastMonthKey = "";

    weeks.forEach((week, weekIndex) => {
      const visibleDays = week.filter((day) => !day.outsideRange);
      if (visibleDays.length === 0) return;

      const firstOfMonth = visibleDays.find((day) => day.date.getDate() === 1);
      const markerDay =
        firstOfMonth ?? (weekIndex === 0 ? visibleDays[0] : null);
      if (!markerDay) return;

      const key = `${markerDay.date.getFullYear()}-${markerDay.date.getMonth()}`;
      if (key === lastMonthKey) return;

      lastMonthKey = key;
      monthMarkers.push({
        key,
        column: weekIndex + 1,
        label: markerDay.date.toLocaleString("en", { month: "short" }),
      });
    });

    const safeCellSize = Math.max(8, Math.min(cellSize, 28));
    const safeGap = Math.max(1, Math.min(gap, 12));
    const width =
      weeks.length * safeCellSize + Math.max(0, weeks.length - 1) * safeGap;

    return {
      weeks,
      monthMarkers,
      total: inRange.reduce((sum, item) => sum + item.count, 0),
      cellSize: safeCellSize,
      gap: safeGap,
      width,
    };
  }, [cellSize, data, gap, weekStartsOn]);

  React.useEffect(() => {
    return () => {
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    };
  }, []);

  if (!prepared) {
    return (
      <div className={cn("text-sm text-muted-foreground", className)}>
        {emptyLabel}
      </div>
    );
  }

  const readableDate = (date: Date) =>
    date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  const tooltipContent = (day: StreakGridResolvedDay) =>
    formatTooltip
      ? formatTooltip(day)
      : day.label
        ? `${day.label} · ${readableDate(day.date)}`
        : `${day.count} ${itemLabel} · ${readableDate(day.date)}`;

  const selectDay = (day: StreakGridResolvedDay) => {
    if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    setSelectedDay(day);
    resetTimerRef.current = setTimeout(() => {
      setSelectedDay(null);
      resetTimerRef.current = null;
    }, 3000);
  };

  const selectedSummary = selectedDay ? (
    formatSelection ? (
      formatSelection(selectedDay)
    ) : (
      <>
        <strong className="font-semibold text-foreground">
          {selectedDay.count}
        </strong>{" "}
        {itemLabel} · {readableDate(selectedDay.date)}
      </>
    )
  ) : null;

  return (
    <div className={cn("w-full min-w-0", className)}>
      <div
        className="mx-auto min-w-0"
        style={{ width: `min(100%, ${prepared.width}px)` }}
      >
        <div className="min-w-0 overflow-x-auto overscroll-x-contain pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <div style={{ width: prepared.width }}>
            {showMonthLabels && prepared.weeks.length > 2 && (
              <div
                className="mb-1 grid h-4 text-[11px] text-muted-foreground"
                style={{
                  width: prepared.width,
                  gridTemplateColumns: `repeat(${prepared.weeks.length}, ${prepared.cellSize}px)`,
                  columnGap: prepared.gap,
                }}
              >
                {prepared.monthMarkers.map((month) => (
                  <span
                    key={month.key}
                    className="whitespace-nowrap"
                    style={{
                      gridColumn: `${Math.min(month.column, prepared.weeks.length - 2)} / span 3`,
                    }}
                  >
                    {month.label}
                  </span>
                ))}
              </div>
            )}

            <div
              role="grid"
              aria-label={`${itemLabel} streak grid`}
              className="grid"
              style={{
                width: prepared.width,
                gridTemplateColumns: `repeat(${prepared.weeks.length}, ${prepared.cellSize}px)`,
                columnGap: prepared.gap,
              }}
            >
              {prepared.weeks.map((week, weekIndex) => (
                <div
                  key={weekIndex}
                  role="row"
                  className="flex flex-col"
                  style={{ gap: prepared.gap }}
                >
                  {week.map((day) => {
                    const resolvedDay: StreakGridResolvedDay = {
                      date: day.date,
                      count: day.count,
                      label: day.label,
                      level: day.level,
                    };

                    const cell = (
                      <span
                        role="gridcell"
                        aria-hidden={day.outsideRange || undefined}
                        aria-label={
                          day.outsideRange
                            ? undefined
                            : `${day.count} ${itemLabel} on ${readableDate(day.date)}`
                        }
                        tabIndex={day.outsideRange ? -1 : 0}
                        onClick={() => {
                          if (!day.outsideRange) selectDay(resolvedDay);
                        }}
                        className={cn(
                          "shrink-0 rounded-[3px] transition-[transform,background-color,opacity] duration-150 ease-out",
                          day.outsideRange
                            ? "pointer-events-none bg-transparent opacity-0"
                            : cn(
                                "cursor-pointer hover:scale-110 focus-visible:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background",
                                LEVEL_CLASSES[day.level],
                              ),
                        )}
                        style={{
                          width: prepared.cellSize,
                          height: prepared.cellSize,
                        }}
                      />
                    );

                    if (day.outsideRange) {
                      return (
                        <React.Fragment key={dateKey(day.date)}>
                          {cell}
                        </React.Fragment>
                      );
                    }

                    return (
                      <Tooltip key={dateKey(day.date)}>
                        <TooltipTrigger asChild>{cell}</TooltipTrigger>
                        <TooltipContent side="top" sideOffset={6}>
                          {tooltipContent(resolvedDay)}
                        </TooltipContent>
                      </Tooltip>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        {(showSummary || showLegend) && (
          <div className="mt-3 flex min-w-0 flex-wrap items-center justify-between gap-x-4 gap-y-2 text-[11px] text-muted-foreground">
            {showSummary ? (
              <span className="min-w-0 truncate" aria-live="polite">
                {selectedSummary ?? (
                  <>
                    <strong className="font-semibold text-foreground">
                      {prepared.total}
                    </strong>{" "}
                    {itemLabel} last year
                  </>
                )}
              </span>
            ) : (
              <span />
            )}

            {showLegend && (
              <div className="flex shrink-0 items-center gap-[3px]">
                <span>{lessLabel}</span>
                {LEVEL_CLASSES.map((levelClass, index) => (
                  <span
                    key={index}
                    aria-hidden="true"
                    className={cn("size-[10px] rounded-[3px]", levelClass)}
                  />
                ))}
                <span>{moreLabel}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
