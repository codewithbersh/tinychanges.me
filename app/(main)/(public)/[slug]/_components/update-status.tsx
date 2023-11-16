"use client";

import { trpc } from "@/app/_trpc/client";
import { cn } from "@/lib/utils";
import { GetCommitmentsByHabitId } from "@/types/types";
import { Check } from "lucide-react";

interface UpdateStatus {
  habitId: string;
  hasToday: GetCommitmentsByHabitId[number] | undefined;
}

export const UpdateStatus = ({ habitId, hasToday }: UpdateStatus) => {
  const utils = trpc.useUtils();
  const { mutate, isLoading } = trpc.commitment.private.mutate.useMutation();

  const onClick = () => {
    mutate(
      { habitId },
      {
        onSuccess: () => {
          utils.commitment.public.byHabitId.invalidate();
          utils.commitment.private.byHabitId.invalidate();
        },
      },
    );
  };

  return (
    <button
      className={cn(
        "ml-auto grid h-9 w-9 shrink-0 cursor-pointer place-items-center rounded-full border   bg-accent   text-muted-foreground transition disabled:animate-pulse disabled:opacity-50",
        hasToday &&
          hasToday.status === "COMPLETED" &&
          "bg-green-500 text-primary-foreground ",
        hasToday &&
          hasToday.status === "SKIPPED" &&
          "bg-amber-400 text-primary-foreground",
      )}
      onClick={() => {
        if (!isLoading) {
          onClick();
        }
      }}
      disabled={isLoading}
    >
      <Check className="h-5 w-5 " />
    </button>
  );
};
