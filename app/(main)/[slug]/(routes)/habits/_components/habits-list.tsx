"use client";

import { trpc } from "@/app/_trpc/client";
import { useSession } from "next-auth/react";
import { notFound, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { HabitEmojiIcon } from "@/components/habit-emoji-icon";
import { Skeleton } from "@/components/ui/skeleton";

export const HabitsList = () => {
  const { data: session } = useSession();
  const params = useParams();
  const slug = params["slug"];

  if (!session?.user && session?.user.slug !== slug) {
    return notFound();
  }

  const { data: habits, isLoading } = trpc.habit.getAll.useQuery({
    slug: slug as string,
  });

  if (isLoading) {
    return <HabitsList.Skeleton />;
  }

  return (
    <ol className="flex flex-col gap-4">
      {habits?.map((habit) => (
        <Link passHref href={`/${slug}/habits/${habit.id}`}>
          <li className="flex items-center gap-4 rounded-md bg-input-background/50 p-4">
            <HabitEmojiIcon color={habit.color} emoji={habit.emoji} />
            <h1>{habit.habit}</h1>
            <ArrowRight className="ml-auto h-4 w-4" />
          </li>
        </Link>
      ))}
    </ol>
  );
};

HabitsList.Skeleton = function SkeletonHabitsList() {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <Skeleton className="h-16 rounded-md" key={index} />
      ))}
    </div>
  );
};
