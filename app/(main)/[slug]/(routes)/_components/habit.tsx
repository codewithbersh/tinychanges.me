"use client";

import { GetAllHabits } from "@/types/types";
import { trpc } from "@/app/_trpc/client";

import { ContributionGraph } from "./contribution/contribution-graph";

interface HabitProps {
  habit: GetAllHabits[number];
  days: string[];
}

export const Habit = ({ habit, days }: HabitProps) => {
  const { data: contributions } = trpc.contribution.getAllByHabitId.useQuery(
    {
      habitId: habit.id,
    },
    {
      staleTime: Infinity,
    },
  );

  return (
    <ContributionGraph
      days={days}
      habit={habit}
      contributions={contributions?.contributions}
      streaks={contributions?.streaks}
    />
  );
};

Habit.Skeleton = function SkeletonHabit() {
  return <ContributionGraph.Skeleton />;
};
