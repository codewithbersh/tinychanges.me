"use client";

import Link from "next/link";
import Image from "next/image";
import { Plus } from "lucide-react";

import { Button } from "./ui/button";

interface EmptyHabitsProps {
  slug: string;
  isOwner: boolean;
}

export const EmptyHabits = ({ slug, isOwner }: EmptyHabitsProps) => {
  return (
    <div className="flex flex-col items-center gap-4 py-8 md:py-12">
      <div className=" w-56">
        <Image src="/empty-habits.png" alt="" width={2048} height={1848} />
      </div>
      <div className="space-y-2">
        <p className="text-center">No Habits</p>
        {isOwner && (
          <p className="max-w-xs text-center text-muted-foreground">
            Create your first habit, click the button below to start.
          </p>
        )}
      </div>
      {isOwner && (
        <Button asChild>
          <Link href={`/${slug}/habits/new`}>
            <Plus className="mr-2 h-4 w-4" />
            Create Habit
          </Link>
        </Button>
      )}
    </div>
  );
};
