import { serverTrpc } from "@/app/_trpc/server";
import { User } from "next-auth";

import { Habits } from "./habits";

interface HabitsServerProps {
  slug: string;
  user: User | undefined;
}

export const HabitsServer = async ({ slug, user }: HabitsServerProps) => {
  const habits = await serverTrpc.habit.public.getAll({ slug });

  return <Habits initialData={habits} slug={slug} user={user} />;
};
