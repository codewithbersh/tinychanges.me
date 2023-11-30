"use client";

import { useParams } from "next/navigation";
import { trpc } from "@/app/_trpc/client";

import { EmptyHabits } from "@/components/empty-habits";
import { Habit } from "./habit";

export const Habits = () => {
  const params = useParams();

  const slug = params["slug"] as string;

  const { data: habits, isLoading } = trpc.habit.getAll.useQuery(
    { slug },
    { staleTime: Infinity },
  );

  if (isLoading) {
    return (
      <div className="flex flex-col gap-8">
        {Array.from({ length: 3 }).map((_, index) => (
          <Habit.Skeleton key={index} />
        ))}
      </div>
    );
  }

  if (!habits || habits.length < 1) {
    return <EmptyHabits />;
  }
  return (
    <>
      {habits.map((habit) => (
        <Habit key={habit.id} habit={habit} slug={slug} />
      ))}
    </>
  );
};
