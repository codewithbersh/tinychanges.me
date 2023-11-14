"use client";

import { GetHabits } from "@/types/types";
import { Check } from "lucide-react";
import { useSearchParams } from "next/navigation";
import {
  cn,
  formatDay,
  formatRange,
  formatRangeParams,
  formatViewParams,
} from "@/lib/utils";
import { format, isToday } from "date-fns";

import { HabitEmoji } from "@/components/habit-emoji";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface HabitProps {
  habit: GetHabits[number];
}

export const Habit = ({ habit }: HabitProps) => {
  const searchParams = useSearchParams();
  const view = formatViewParams(searchParams.get("view"));
  const range = formatRangeParams(searchParams.get("range"));
  const { days, range: viewRange } = formatRange({ view, range });
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <HabitEmoji
          color={habit.color}
          emoji={habit.emoji}
          className="h-9 w-9 shrink-0 text-xl"
        />
        <div className="truncate">
          <h1 className="truncate font-medium">{habit.habit}</h1>
        </div>
        <div className="ml-auto grid h-9 w-9 shrink-0 cursor-pointer place-items-center rounded-full border bg-accent/25 text-muted-foreground transition hover:bg-primary hover:text-primary-foreground">
          <Check className="h-5 w-5" />
        </div>
      </div>

      <div className={cn("flex flex-wrap gap-2", view === "weekly" && "gap-4")}>
        {Array.from({ length: days }, (_, index) => {
          const day = formatDay({
            from: viewRange.from,
            index,
          });

          const isDayToday = isToday(day);
          const tooltipLabel = format(day, "MMM dd");
          const weekLabel = format(day, "EEE");
          return (
            <TooltipProvider key={index} delayDuration={200}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex flex-col items-center justify-center gap-2">
                    {view === "weekly" && (
                      <div className="text-xs text-muted-foreground">
                        {weekLabel}
                      </div>
                    )}
                    <div
                      className={cn(
                        "h-4 w-4 rounded-[2px] bg-accent",
                        view === "weekly" && "h-6 w-6 rounded-[4px]",
                        isDayToday &&
                          "ring-2 ring-primary/50 ring-offset-2 ring-offset-background",
                      )}
                    />
                  </div>
                </TooltipTrigger>
                <TooltipContent sideOffset={8}>
                  <p>{tooltipLabel}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
        })}
      </div>
    </div>
  );
};
