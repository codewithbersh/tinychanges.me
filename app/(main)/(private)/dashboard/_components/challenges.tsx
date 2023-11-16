"use client";

import { trpc } from "@/app/_trpc/client";
import { GetChallenges, GetHabits } from "@/types/types";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { HabitEmoji } from "@/components/habit-emoji";

interface HabitsProps {
  initialData: GetChallenges;
}

export const Challenges = ({ initialData }: HabitsProps) => {
  const { data: challenges } = trpc.challenge.get.all.useQuery(undefined, {
    initialData,
    staleTime: Infinity,
  });

  if (!challenges || challenges.length === 0) {
    return (
      <div className="text-center text-sm text-muted-foreground">
        No challenges found.
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-4">
      {challenges.map((challenge) => (
        <li key={challenge.id}>
          <Link
            href={`/dashboard/challenges/${challenge.id}`}
            className="flex h-14 w-full items-center gap-4 rounded-lg border bg-background p-3  transition-colors duration-300 ease-in-out hover:bg-accent"
          >
            <HabitEmoji color="#db2777" emoji={challenge.emoji} />
            <div className="font-medium">{challenge.challenge}</div>
            <ArrowRight className="ml-auto h-4 w-4" />
          </Link>
        </li>
      ))}
    </ul>
  );
};
