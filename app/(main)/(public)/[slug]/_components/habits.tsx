"use client";

import { trpc } from "@/app/_trpc/client";
import { GetHabits } from "@/types/types";

import { Habit } from "./habit";

interface HabitsProps {
  initialData: GetHabits;
  slug: string;
}

export const Habits = ({ initialData, slug }: HabitsProps) => {
  const { data: habits } = trpc.habit.public.getAll.useQuery(
    { slug },
    {
      initialData,
      staleTime: Infinity,
    },
  );

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
        <div key={habit.id} className="w-full rounded-lg border p-4">
          <Habit habit={habit} />
        </div>
      ))}
    </div>
  );
};
