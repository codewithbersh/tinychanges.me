"use client";

import { GetAllHabits } from "@/types/types";
import { trpc } from "@/app/_trpc/client";
import { startOfToday } from "date-fns";

import { Icons } from "@/components/ui/icons";
import { Skeleton } from "@/components/ui/skeleton";
import { Contributions } from "./contributions";
import { ContributeTodayToggle } from "./contribute-today-toggle";

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

  const contribToday = contributions?.contributions.find(
    (contrib) => contrib.date.getTime() === startOfToday().getTime(),
  );
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 truncate">
          <div
            className="text-2l grid h-10 w-10 place-items-center rounded-sm  !bg-opacity-25 leading-none"
            style={{ backgroundColor: habit.color }}
          >
            {habit.emoji}
          </div>
          <div className="flex h-full flex-col justify-between truncate ">
            <div className="w-fit truncate text-sm font-medium">
              {habit.habit}
            </div>
            <div className="flex gap-4 md:hidden">
              <div className="flex items-center gap-1">
                <Icons.contributions className="h-4 w-4" />
                <div className="text-sm">{contributions?.total}</div>
              </div>

              <div className="flex items-center gap-1">
                <Icons.streak className="h-4 w-4" />
                <div className="text-sm">
                  {contributions?.streak.currentStreak}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden gap-4 md:flex">
            <div className="flex items-center gap-1">
              <Icons.contributions className="h-4 w-4" />
              <div className="text-sm">{contributions?.total}</div>
            </div>

            <div className="flex items-center gap-1">
              <Icons.streak className="h-4 w-4" />
              <div className="text-sm">
                {contributions?.streak.currentStreak}
              </div>
            </div>
          </div>

          <ContributeTodayToggle
            contribTodayId={contribToday?.id}
            habitId={habit.id}
          />
        </div>
      </div>

      <Contributions contributions={contributions?.dates} />
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
