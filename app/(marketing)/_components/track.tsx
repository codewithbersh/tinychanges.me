"use client";

import {
  addDays,
  eachDayOfInterval,
  format,
  getDaysInMonth,
  startOfMonth,
  startOfToday,
} from "date-fns";
import { useEffectOnce } from "usehooks-ts";
import { Check } from "lucide-react";
import { cn, isInCommitments, toggleCommit } from "@/lib/utils";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DemoLabel } from "./demo-label";

interface TrackProps {
  color: string;
  habit: string;
  emoji: string;
  commitments: Date[] | null;
  setCommitments: (values: Date[]) => void;
}

export const Track = ({
  color,
  habit,
  emoji,
  commitments,
  setCommitments,
}: TrackProps) => {
  const today = startOfToday();
  const days = getDaysInMonth(today);

  const pastDays = eachDayOfInterval({
    start: startOfMonth(today),
    end: today,
  });

  useEffectOnce(() => {
    setCommitments(pastDays);
  });

  return (
    <div className="space-y-6">
      <DemoLabel
        title="Track."
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed."
      />

      <div className="space-y-4 rounded-lg border bg-input-background p-4">
        <div className="flex items-center gap-2">
          <div
            className="grid aspect-square h-12 place-items-center rounded-md text-xl leading-none"
            style={{ backgroundColor: color }}
          >
            {emoji}
          </div>
          <div className="truncate font-medium">{habit}</div>
          <div
            className={cn(
              "ml-auto grid h-9 w-9 place-items-center rounded-full bg-neutral-300 text-primary dark:bg-neutral-800",
            )}
            role="button"
            style={{
              backgroundColor: isInCommitments(today, commitments) ? color : "",
            }}
            onClick={() => toggleCommit(today, commitments, setCommitments)}
          >
            <Check className="h-6 w-6" />
          </div>
        </div>

        <div className="grid grid-flow-col grid-rows-2 place-content-between gap-y-1 justify-self-center">
          {Array.from({ length: days }, (_, index) => {
            const day = addDays(startOfMonth(today), index);
            return (
              <TooltipProvider key={index}>
                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <div
                      className={cn(
                        "h-4 w-4 rounded-[2px] bg-neutral-300 dark:bg-neutral-800",
                      )}
                      style={{
                        backgroundColor: isInCommitments(day, commitments)
                          ? color
                          : "",
                      }}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    {format(day, "MMMM dd, yyyy")}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            );
          })}
        </div>
      </div>
    </div>
  );
};
