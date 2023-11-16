"use client";

import { ViewOptionActions } from "@/app/(main)/(public)/[slug]/_components/view-option-actions";
import { trpc } from "@/app/_trpc/client";
import {
  cn,
  formatDay,
  formatRange,
  formatRangeParams,
  formatViewParams,
} from "@/lib/utils";
import { getDay } from "date-fns";
import { Loader } from "lucide-react";
import { useSearchParams } from "next/navigation";

const names = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface ViewCommitmentsProps {
  habitId: string;
}

export const ViewCommitments = ({ habitId }: ViewCommitmentsProps) => {
  const searchParams = useSearchParams();
  const view = formatViewParams(searchParams.get("view"));
  const range = formatRangeParams(searchParams.get("range"));
  const { days, range: viewRange } = formatRange({ view, range });
  const utils = trpc.useUtils();

  const { data: commitments, isLoading } =
    trpc.commitment.private.byHabitId.useQuery(
      { habitId },
      {
        staleTime: Infinity,
      },
    );

  const { mutate } = trpc.commitment.private.mutateByDate.useMutation();

  const onClick = (date: Date) => {
    mutate(
      { date, habitId },
      {
        onSuccess: () => {
          utils.commitment.private.byHabitId.invalidate();
          utils.commitment.public.byHabitId.invalidate();
        },
      },
    );
  };

  if (isLoading) {
    return (
      <div className="grid place-items-center">
        <Loader className="h-4 w-4 animate-spin" />
      </div>
    );
  }

  if (commitments) {
    return (
      <div className="mt-8 flex flex-col gap-8">
        <ViewOptionActions />
        <div className="grid grid-cols-7 gap-2">
          {names.map((name) => (
            <div
              key={name}
              className="truncate text-center text-sm text-muted-foreground"
            >
              {name}
            </div>
          ))}
          {Array.from({ length: days }, (_, index) => {
            const hello =
              "col-start-1 col-start-2 col-start-3 col-start-4 col-start-5 col-start-6 col-start-7";

            const day = formatDay({
              from: viewRange.from,
              index,
            });

            const hasCommitment = commitments?.find(
              (commitment) =>
                commitment.date.toDateString() === day.toDateString(),
            );

            return (
              <button
                className={cn(
                  "grid aspect-square w-full cursor-pointer place-items-center rounded-md border bg-input-background text-lg font-bold transition hover:opacity-75 disabled:cursor-not-allowed disabled:opacity-50",
                  index === 0 && `col-start-${getDay(viewRange.from) + 1}`,
                  hasCommitment?.status === "COMPLETED" && "bg-pink-600",
                  hasCommitment?.status === "SKIPPED" && "bg-pink-600/25",
                )}
                key={index}
                type="button"
                onClick={() => onClick(day)}
                disabled={new Date() < day}
              >
                {index + 1}
              </button>
            );
          })}
        </div>
      </div>
    );
  }
};
