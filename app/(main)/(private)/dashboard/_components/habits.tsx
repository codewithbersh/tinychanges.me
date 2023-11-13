"use client";

import { trpc } from "@/app/_trpc/client";
import { GetHabits } from "@/types/types";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface HabitsProps {
  initialData: GetHabits;
}

export const Habits = ({ initialData }: HabitsProps) => {
  const { data: habits } = trpc.habit.get.all.useQuery(undefined, {
    initialData,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  if (!habits || habits.length === 0) {
    return (
      <div className="text-center text-sm text-muted-foreground">
        No habits found.
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-4">
      {habits.map((habit) => (
        <li key={habit.id}>
          <Link
            href={`/dashboard/${habit.id}`}
            className="flex h-14 w-full items-center gap-4 rounded-lg border bg-background p-3  transition-colors duration-300 ease-in-out hover:bg-accent"
          >
            <div
              className="grid h-7 w-7 place-items-center rounded-md"
              style={{ backgroundColor: habit.color }}
            >
              <span className="leading-none">{habit.emoji}</span>
            </div>
            <div className="font-medium">{habit.habit}</div>
            <ArrowRight className="ml-auto h-4 w-4" />
          </Link>
        </li>
      ))}
    </ul>
  );
};
