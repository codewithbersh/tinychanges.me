import { serverTrpc } from "@/app/_trpc/server";

import { Habits } from "./habits";

interface ServerHabitsProps {
  slug: string;
}

export const ServerHabits = async ({ slug }: ServerHabitsProps) => {
  const habits = await serverTrpc.habit.public.getAll({ slug });

  return (
    <div>
      <Habits initialData={habits} slug={slug} />
    </div>
  );
};
