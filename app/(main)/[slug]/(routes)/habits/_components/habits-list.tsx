"use client";

import Link from "next/link";
import { notFound, useParams, useSearchParams } from "next/navigation";
import { trpc } from "@/app/_trpc/client";
import { useSession } from "next-auth/react";
import { ArrowRight } from "lucide-react";

import { HabitEmojiIcon } from "@/components/habit-emoji-icon";
import { Skeleton } from "@/components/ui/skeleton";
import { validateArchiveParams } from "@/lib/utils";
import { EmptyHabits } from "@/components/empty-habits";

export const HabitsList = () => {
  const { data: session } = useSession();
  const params = useParams();
  const slug = params["slug"];
  const searchParams = validateArchiveParams(useSearchParams().get("archived"));

  const isOwner = session?.user.slug === slug;

  if (!session?.user && !isOwner) {
    return notFound();
  }

  const { data: habits, isLoading } = trpc.habit.getAllPrivate.useQuery({
    archived: searchParams,
  });

  if (isLoading) {
    return <HabitsList.Skeleton />;
  }

  if (habits?.length === 0) {
    return <EmptyHabits slug={slug as string} isOwner={isOwner} />;
  }

  return (
    <ol className="flex flex-col gap-4">
      {habits?.map((habit) => (
        <Link passHref href={`/${slug}/habits/${habit.id}`} key={habit.id}>
          <li className="flex items-center gap-4 rounded-md bg-input-background/50 p-4">
            <HabitEmojiIcon color={habit.color} emoji={habit.emoji} />
            <h1 className="truncate">{habit.habit}</h1>
            {habit.archived && (
              <div className="rounded-full border border-yellow-300/50 bg-yellow-300/10 px-1.5 py-1 text-xs leading-none text-yellow-300">
                Archived
              </div>
            )}
            <ArrowRight className="ml-auto h-4 w-4 shrink-0" />
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
