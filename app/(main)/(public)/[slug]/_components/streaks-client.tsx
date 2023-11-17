"use client";

import { trpc } from "@/app/_trpc/client";
import { GetStreaks } from "@/types/types";

import { Emoji } from "@/components/emoji";

interface StreaksClientProps {
  slug: string;
  initialData: GetStreaks;
}

export const StreaksClient = ({ slug, initialData }: StreaksClientProps) => {
  const { data: streaks } = trpc.analytic.getStreaks.useQuery(
    { slug },
    {
      initialData,
    },
  );

  if (Object.keys(streaks).length === 0) {
    return (
      <div className="grid h-7 w-full place-items-center">
        <h1 className="h-fit w-fit text-sm text-muted-foreground">
          No streaks.
        </h1>
      </div>
    );
  }

  return (
    <div className="flex gap-6 truncate">
      {Object.keys(streaks).map((habitId) => {
        const habitData = streaks[habitId];
        const { habit, streak } = habitData;

        return (
          <div key={habitId} className="flex items-center gap-1">
            <Emoji
              color={habit.color}
              emoji={habit.emoji}
              className="text-xs"
            />
            <span className="ml-1.5 mr-0.5 text-sm leading-none">🔥</span>
            <span className=" leading-none">{streak}</span>
          </div>
        );
      })}
    </div>
  );
};
