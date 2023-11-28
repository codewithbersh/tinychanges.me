"use client";

import { GetAllHabits } from "@/types/types";
import { trpc } from "@/app/_trpc/client";
import { cn } from "@/lib/utils";

import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface HabitProps {
  habit: GetAllHabits[number];
  isOwner: boolean;
}

export const Habit = ({ habit, isOwner }: HabitProps) => {
  const totalContributions = 25;
  const streakCount = 4;
  const { data: contributons, isLoading } =
    trpc.contribution.getAllByHabitId.useQuery(
      {
        habitId: habit.id,
      },
      {
        staleTime: Infinity,
      },
    );

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 truncate">
          <div
            className={cn(
              `text-2l grid h-10 w-10 place-items-center rounded-sm !bg-[${habit.color}] !bg-opacity-25 leading-none`,
            )}
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
                <div className="text-sm">{totalContributions}</div>
              </div>

              <div className="flex items-center gap-1">
                <Icons.streak className="h-4 w-4" />
                <div className="text-sm">{streakCount}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden gap-4 md:flex">
            <div className="flex items-center gap-1">
              <Icons.contributions className="h-4 w-4" />
              <div className="text-sm">{totalContributions}</div>
            </div>

            <div className="flex items-center gap-1">
              <Icons.streak className="h-4 w-4" />
              <div className="text-sm">{streakCount}</div>
            </div>
          </div>
          {isOwner && (
            <Button variant="secondary">
              <Icons.star className="mr-2" />
              Today
            </Button>
          )}
        </div>
      </div>
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
    </div>
  );
};
