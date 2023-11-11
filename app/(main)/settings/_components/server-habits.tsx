import { serverTrpc } from "@/app/_trpc/server";

import { Habits } from "./habits";

export const ServerHabits = async () => {
  const habits = await serverTrpc.habit.get.all();

  if (habits.length === 0) {
    return (
      <div className="text-center text-sm text-muted-foreground">
        No habits found.
      </div>
    );
  }

  return <Habits initialData={habits} />;
};
