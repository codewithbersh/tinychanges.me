"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Grids } from "./grids";
import { Habit } from "./habit";
import { Activities } from "./activities";
import { Toggle } from "./toggle";

interface ContributionGraphProps {
  days: Date[];
  contributions: Date[] | undefined;
  habit: {
    id: string;
    emoji: string;
    color: string;
    habit: string;
  };
  contributionId: string | undefined;
  totalContributions: number | undefined;
  streak:
    | {
        currentStreak: number;
        longestStreak: number;
        streaks: number[];
        todayInStreak: boolean;
        withinCurrentStreak: boolean;
      }
    | undefined;
}

export const ContributionGraph = ({
  days,
  contributions,
  habit,
  contributionId,
  streak,
  totalContributions,
}: ContributionGraphProps) => {
  return (
    <div className="flex flex-col gap-4 rounded-md bg-neutral-800/50 p-4">
      <div className="flex items-center justify-between">
        <Habit emoji={habit.emoji} habit={habit.habit} />
        <Toggle contributionId={contributionId} habitId={habit.id} />
      </div>

      <div className="overflow-x-auto">
        <Grids days={days} contributions={contributions} color={habit.color} />
      </div>

      <Activities streak={streak} totalContributions={totalContributions} />
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
