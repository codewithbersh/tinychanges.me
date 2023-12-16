"use client";

import { useSearchParams } from "next/navigation";
import { GetAllHabits } from "@/types/types";
import { trpc } from "@/app/_trpc/client";
import { eachDayOfInterval, isSameDay } from "date-fns";
import { formatRangeFilter, validateRangeParams } from "@/lib/utils";

import { ContributionGraph } from "./contribution/contribution-graph";

interface HabitProps {
  habit: GetAllHabits[number];
}

export const Habit = ({ habit }: HabitProps) => {
  const { data: contributions } = trpc.contribution.getAllByHabitId.useQuery(
    {
      habitId: habit.id,
    },
    {
      staleTime: Infinity,
    },
  );

  const today = contributions?.contributions.find((contrib) =>
    isSameDay(contrib.date, new Date()),
  );

  const searchParams = useSearchParams();
  const range = validateRangeParams(searchParams.get("range"));
  const { interval } = formatRangeFilter({ range });

  const days = eachDayOfInterval(interval);

  return (
    <ContributionGraph
      days={days}
      habit={habit}
      contributions={contributions?.dates}
      contributionId={today?.id}
      streak={contributions?.streak}
      totalContributions={contributions?.contributions.length}
    />
  );
};

Habit.Skeleton = function SkeletonHabit() {
  return <ContributionGraph.Skeleton />;
};
