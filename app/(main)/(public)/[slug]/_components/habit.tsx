import { GetHabits } from "@/types/types";
import { cn, formatDay } from "@/lib/utils";
import { format, isToday, startOfToday } from "date-fns";
import { trpc } from "@/app/_trpc/client";

import { HabitEmoji } from "@/components/habit-emoji";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Skeleton } from "@/components/ui/skeleton";
import { UpdateStatus } from "./update-status";

interface HabitProps {
  isOwner: boolean;
  habit: GetHabits[number];
  view: "weekly" | "monthly";
  days: number;
  viewRange: {
    from: Date;
    to: Date;
  };
}

export const Habit = ({
  habit,
  view,
  days,
  viewRange,
  isOwner,
}: HabitProps) => {
  const { data: commitments, isLoading } =
    trpc.commitment.public.byHabitId.useQuery(
      {
        habitId: habit.id,
        type: "DAILY",
      },
      {
        staleTime: Infinity,
      },
    );

  const hasToday = commitments?.find(
    (commitment) =>
      commitment.date.toDateString() === startOfToday().toDateString(),
  );

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
        {isOwner && isLoading && (
          <Skeleton className="ml-auto h-9 w-9 rounded-full bg-accent" />
        )}
        {isOwner && !isLoading && (
          <UpdateStatus habitId={habit.id} hasToday={hasToday} />
        )}
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

          const hasCommitment = commitments?.find(
            (commitment) =>
              commitment.date.toDateString() === day.toDateString(),
          );
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
                          "ring-2 ring-primary/40 ring-offset-2 ring-offset-background",
                        hasCommitment?.status === "COMPLETED" && "bg-pink-600",
                        hasCommitment?.status === "SKIPPED" && "bg-pink-600/25",
                      )}
                    />
                  </div>
                </TooltipTrigger>
                <TooltipContent sideOffset={8}>
                  <p>
                    {hasCommitment && (
                      <span>{hasCommitment.status.toLowerCase()} – </span>
                    )}
                    {tooltipLabel}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
        })}
      </div>
    </div>
  );
};
