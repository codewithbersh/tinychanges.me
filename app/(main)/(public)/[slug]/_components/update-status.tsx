"use client";

import { trpc } from "@/app/_trpc/client";
import { cn } from "@/lib/utils";
import { GetCommitmentsByHabitId } from "@/types/types";
import { Check } from "lucide-react";

interface UpdateStatus {
  habitId: string;
  commitmentToday: GetCommitmentsByHabitId[number] | undefined;
  className?: string;
  color: string;
}

export const UpdateStatus = ({
  habitId,
  commitmentToday,
  className,
  color,
}: UpdateStatus) => {
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
        "grid h-9 w-9 shrink-0 cursor-pointer place-items-center rounded-full border bg-accent text-muted-foreground transition hover:opacity-100 disabled:animate-pulse disabled:opacity-50",
        commitmentToday?.status === "SKIPPED" && "opacity-25",
        commitmentToday && "text-primary",
        className,
      )}
      onClick={() => {
        if (!isLoading) {
          onClick();
        }
      }}
      disabled={isLoading}
      style={{
        backgroundColor: commitmentToday ? color : "",
        borderColor: commitmentToday ? color : "",
      }}
    >
      <Check className="h-5 w-5 stroke-[3px]" />
    </button>
  );
};
