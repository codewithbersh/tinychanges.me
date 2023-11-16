import { serverTrpc } from "@/app/_trpc/server";
import { User } from "next-auth";

import { Habits } from "./habits";

interface ServerHabitsProps {
  slug: string;
  user: User | undefined;
}

export const ServerHabits = async ({ slug, user }: ServerHabitsProps) => {
  const habits = await serverTrpc.habit.public.getAll({ slug });

  return <Habits initialData={habits} slug={slug} user={user} />;
};
