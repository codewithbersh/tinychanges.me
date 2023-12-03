"use client";

import Link from "next/link";
import { GetAllHabits } from "@/types/types";
import { trpc } from "@/app/_trpc/client";
import { isSameDay } from "date-fns";
import { LinkIcon } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import { Contributions } from "./contributions";
import { ContributeTodayToggle } from "./contribute-today-toggle";
import { StreakAndContribs } from "./streak-and-contribs";

interface HabitProps {
  habit: GetAllHabits[number];
  slug: string;
}

export const Habit = ({ habit, slug }: HabitProps) => {
  const { data: contributions } = trpc.contribution.getAllByHabitId.useQuery(
    {
      habitId: habit.id,
    },
    {
      staleTime: Infinity,
    },
  );

  const contribToday = contributions?.contributions.find((contrib) =>
    isSameDay(contrib.date, new Date()),
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 truncate">
          <div
            className="grid h-10 w-10 shrink-0 place-items-center rounded-sm text-2xl leading-none"
            style={{ backgroundColor: habit.color }}
          >
            {habit.emoji}
          </div>
          <div className="flex h-full flex-col justify-between">
            <Link
              href={`/${slug}/habits/${habit.id}`}
              className="flex w-fit items-center text-sm font-medium underline-offset-2 hover:underline md:text-base"
            >
              {habit.habit}
              <LinkIcon className="ml-2 h-3 w-3" />
            </Link>

            <StreakAndContribs
              streak={contributions?.streak.currentStreak}
              contribs={contributions?.total}
              className="flex md:hidden"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <StreakAndContribs
            streak={contributions?.streak.currentStreak}
            contribs={contributions?.total}
            className="hidden md:flex"
          />
          <ContributeTodayToggle
            contribTodayId={contribToday?.id}
            habitId={habit.id}
          />
        </div>
      </div>

      <Contributions
        contributions={contributions?.dates}
        habitColor={habit.color}
      />
    </div>
  );
};

Habit.Skeleton = function SkeletonHabit() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-4">
        <Skeleton className="h-10 w-10 shrink-0 rounded-md" />
        <div className="flex w-full flex-col gap-1 md:flex-row">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-16 md:ml-auto" />
        </div>
        <Skeleton className="ml-auto h-8 !w-[88px] shrink-0" />
      </div>
      <Skeleton className="h-24 rounded-lg" />
    </div>
  );
};
