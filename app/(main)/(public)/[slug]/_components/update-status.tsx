"use client";

import { trpc } from "@/app/_trpc/client";
import { cn } from "@/lib/utils";
import { GetCommitmentsByHabitId } from "@/types/types";
import { Check } from "lucide-react";

interface UpdateStatus {
  habitId: string;
  commitmentToday: GetCommitmentsByHabitId[number] | undefined;
  className?: string;
}

export const UpdateStatus = ({
  habitId,
  commitmentToday,
  className,
}: UpdateStatus) => {
  const utils = trpc.useUtils();
  const { mutate, isLoading } = trpc.commitment.private.mutate.useMutation();

  const onClick = () => {
    mutate(
      { habitId },
      {
        onSuccess: () => {
          utils.commitment.public.byHabitId.invalidate({ type: "DAILY" });
          utils.commitment.private.byHabitId.invalidate();
        },
      },
    );
  };

  return (
    <button
      className={cn(
        "grid h-9 w-9 shrink-0 cursor-pointer place-items-center rounded-full border   bg-accent   text-muted-foreground transition disabled:animate-pulse disabled:opacity-50",
        commitmentToday &&
          commitmentToday.status === "COMPLETED" &&
          "bg-green-500 text-primary-foreground ",
        commitmentToday &&
          commitmentToday.status === "SKIPPED" &&
          "bg-amber-400 text-primary-foreground",
        className,
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
