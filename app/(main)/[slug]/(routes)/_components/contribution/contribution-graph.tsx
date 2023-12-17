"use client";

import { getISODate } from "@/lib/get-iso-date";

import { Skeleton } from "@/components/ui/skeleton";
import { Grids } from "./grids";
import { Habit } from "./habit";
import { Activities } from "./activities";
import { Toggle } from "./toggle";

interface ContributionGraphProps {
  days: string[];
  contributions: string[] | undefined;
  habit: {
    id: string;
    emoji: string;
    color: string;
    habit: string;
  };
  streaks:
    | {
        currentStreak: number;
        longestStreak: number;
      }
    | undefined;
}

export const ContributionGraph = ({
  days,
  contributions,
  habit,
  streaks,
}: ContributionGraphProps) => {
  const hasContribToday = !!contributions?.some(
    (contribution) => contribution === getISODate(new Date()),
  );

  return (
    <div className="flex flex-col gap-4 rounded-md bg-neutral-800/50 p-4">
      <div className="flex items-center justify-between">
        <Habit emoji={habit.emoji} habit={habit.habit} />
        <Toggle hasContribToday={hasContribToday} habitId={habit.id} />
      </div>

      <div className="overflow-x-auto">
        <Grids days={days} contributions={contributions} color={habit.color} />
      </div>

      <Activities
        streaks={streaks}
        totalContributions={contributions?.length}
      />
    </div>
  );
};

ContributionGraph.Skeleton = function SkeletonContributionGraph() {
  return (
    <div className="flex flex-col gap-4 rounded-md bg-neutral-800/50 p-4">
      <div className="flex items-center justify-between">
        <Habit.Skeleton />
        <Skeleton className="h-8 w-[87.76px] rounded-md" />
      </div>

      <Skeleton className="h-[108px] w-full rounded-md" />
      <Activities.Skeleton />
    </div>
  );
};
