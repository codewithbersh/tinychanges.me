import { serverTrpc } from "@/app/_trpc/server";

import { Habits } from "./habits";
import { User } from "next-auth";

interface ServerHabitsProps {
  slug: string;
  user: User | undefined;
}

export const ServerHabits = async ({ slug, user }: ServerHabitsProps) => {
  const habits = await serverTrpc.habit.public.getAll({ slug });

  return (
    <div>
      <Habits initialData={habits} slug={slug} user={user} />
    </div>
  );
};
