"use client";

import { format, formatISO } from "date-fns";
import { GetAllHabits } from "@/types/types";
import { trpc } from "@/app/_trpc/client";
import ActivityCalendar from "react-activity-calendar";
import React from "react";
import * as Tooltip from "@radix-ui/react-tooltip";

import { Skeleton } from "@/components/ui/skeleton";

import { Activities } from "./contribution/activities";
import { Toggle } from "./contribution/toggle";
import { Habit as HabitInfo } from "./contribution/habit";

interface HabitProps {
  habit: GetAllHabits[number];
  range: {
    start: string;
    end: string;
  };
}

export const Habit = ({ habit, range }: HabitProps) => {
  const { data: contributions, isLoading } =
    trpc.contribution.getAllByHabitId.useQuery(
      {
        habitId: habit.id,
      },
      {
        staleTime: Infinity,
      },
    );

  const todayISO = formatISO(new Date(), { representation: "date" });

  const hasContribToday = !!contributions?.data.some(
    (contrib) => contrib.date === todayISO,
  );

  return (
    <div className="flex flex-col gap-4 rounded-md bg-neutral-800/50 p-4">
      <div className="flex items-center justify-between">
        <HabitInfo emoji={habit.emoji} habit={habit.habit} />
        <Toggle hasContribToday={hasContribToday} habitId={habit.id} />
      </div>

      <ActivityCalendar
        loading={isLoading}
        hideTotalCount
        hideColorLegend
        maxLevel={1}
        weekStart={0}
        data={[
          {
            date: range.start,
            level: 0,
            count: 0,
          },
          ...(contributions?.data ?? []),
          {
            date: range.end,
            level: 0,
            count: 0,
          },
        ]}
        theme={{
          light: ["#404040", habit.color],
          dark: ["#404040", habit.color],
        }}
        renderBlock={(block, activity) => {
          return (
            <Tooltip.Provider delayDuration={300} skipDelayDuration={0}>
              <Tooltip.Root>
                <Tooltip.Trigger asChild>{block}</Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Content
                    className="z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
                    sideOffset={5}
                  >
                    {format(new Date(activity.date), "MMMM do")}
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>
            </Tooltip.Provider>
          );
        }}
      />

      <Activities
        streaks={contributions?.streaks}
        totalContributions={contributions?.data.length}
      />
    </div>
  );
};

Habit.Skeleton = function SkeletonHabit() {
  return (
    <div className="flex flex-col gap-4 rounded-md bg-neutral-800/50 p-4">
      <div className="flex items-center justify-between">
        <HabitInfo.Skeleton />
        <Skeleton className="h-8 w-[87.76px] rounded-md" />
      </div>

      <Skeleton className="h-[130px] w-full rounded-md" />
      <Activities.Skeleton />
    </div>
  );
};
