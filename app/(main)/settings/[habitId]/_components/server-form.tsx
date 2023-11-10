import { serverTrpc } from "@/app/_trpc/server";

import { FormHabit } from "./form-habit";

interface ServerFormProps {
  habitId: string;
}

export const ServerForm = async ({ habitId }: ServerFormProps) => {
  const habit = await serverTrpc.habit.get({ id: habitId });

  return <FormHabit initialData={habit} />;
};
