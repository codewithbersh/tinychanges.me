import { GetHabits } from "@/types/types";
import { cn, formatDay } from "@/lib/utils";
import { format, isToday, startOfToday } from "date-fns";
import { trpc } from "@/app/_trpc/client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Emoji } from "@/components/emoji";
import { CommitmentTooltip } from "@/components/commitment-tooltip";
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
      },
      {
        staleTime: Infinity,
      },
    );

  const commitmentToday = commitments?.find(
    (commitment) =>
      commitment.date.toDateString() === startOfToday().toDateString(),
  );

  return (
    <Card className="space-y-6">
      <CardHeader className="flex-row items-center gap-4">
        <Emoji
          color={habit.color}
          emoji={habit.emoji}
          className="h-9 w-9 shrink-0 text-xl"
        />

        <div className="space-y-1 truncate">
          <h1>{habit.habit}</h1>
        </div>

        {isOwner && !isLoading && (
          <UpdateStatus
            habitId={habit.id}
            commitmentToday={commitmentToday}
            className="ml-auto"
          />
        )}
      </CardHeader>

      <CardContent
        className={cn("flex flex-wrap gap-2", view === "weekly" && "gap-4")}
      >
        {Array.from({ length: days }, (_, index) => {
          const day = formatDay({
            from: viewRange.from,
            index,
          });

          const hasCommitment = commitments?.find(
            (commitment) =>
              commitment.date.toDateString() === day.toDateString(),
          );

          const isDayToday = isToday(day);
          const weekLabel = format(day, "EEE");
          const tooltipLabel = hasCommitment
            ? `${hasCommitment.status.toLowerCase()} - ${format(day, "MMM dd")}`
            : format(day, "MMM dd");

          return (
            <CommitmentTooltip label={tooltipLabel} key={day.toDateString()}>
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
            </CommitmentTooltip>
          );
        })}
      </CardContent>
    </Card>
  );
};
