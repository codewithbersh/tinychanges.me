"use client";

import { trpc } from "@/app/_trpc/client";
import { GetHabits } from "@/types/types";
import { User } from "next-auth";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { formatRange, formatRangeParams, formatViewParams } from "@/lib/utils";

import { Habit } from "./habit";

interface HabitsProps {
  initialData: GetHabits;
  slug: string;
  user: User | undefined;
}

export const Habits = ({ initialData, slug }: HabitsProps) => {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const view = formatViewParams(searchParams.get("view"));
  const range = formatRangeParams(searchParams.get("range"));
  const { days, range: viewRange } = formatRange({ view, range });

  const { data: habits } = trpc.habit.public.getAll.useQuery(
    { slug },
    {
      initialData,
      staleTime: Infinity,
    },
  );

  const isOwner = slug === session?.user.slug;

  if (!habits || habits.length === 0) {
    return (
      <div className="text-center text-sm text-muted-foreground">
        No habits found.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {habits.map((habit) => (
        <Habit
          habit={habit}
          view={view}
          days={days}
          viewRange={viewRange}
          isOwner={isOwner}
          key={habit.id}
        />
      ))}
    </div>
  );
};
