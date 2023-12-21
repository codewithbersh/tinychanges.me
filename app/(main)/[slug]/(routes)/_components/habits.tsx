"use client";

import { useParams, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { trpc } from "@/app/_trpc/client";
import { getRange } from "@/lib/get-days-in-range";

import { EmptyHabits } from "@/components/empty-habits";
import { Habit } from "./habit";

export const Habits = () => {
  const params = useParams();
  const { data: session } = useSession();
  const searchParams = useSearchParams();

  const slug = params["slug"] as string;

  const { data: habits, isLoading } = trpc.habit.getAll.useQuery(
    { slug },
    { staleTime: Infinity },
  );

  const range = getRange(searchParams.get("range"));

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
    return <EmptyHabits slug={slug} isOwner={session?.user.slug === slug} />;
  }

  return (
    <>
      {habits.map((habit) => (
        <Habit key={habit.id} habit={habit} range={range} />
      ))}
    </>
  );
};
