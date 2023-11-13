import { serverTrpc } from "@/app/_trpc/server";

import { Habits } from "./habits";

export const ServerHabits = async () => {
  const habits = await serverTrpc.habit.get.all();

  return <Habits initialData={habits} />;
};
