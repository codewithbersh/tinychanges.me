"use client";

import {
  addDays,
  getDay,
  getDaysInMonth,
  isFuture,
  isSameDay,
  startOfMonth,
  startOfToday,
} from "date-fns";
import { cn, isInCommitments, toggleCommit } from "@/lib/utils";
import { marketingConfig } from "@/config/marketing";

import { DemoLabel } from "./demo-label";

const labels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface UpdateProps {
  color: string;
  commitments: Date[] | null;
  setCommitments: (values: Date[]) => void;
}

export const Update = ({ color, commitments, setCommitments }: UpdateProps) => {
  const today = startOfToday();
  const daysInMonth = getDaysInMonth(today);

  return (
    <div className="space-y-6">
      <DemoLabel
        title={marketingConfig.update.title}
        description={marketingConfig.update.description}
      />

      <div className="grid grid-cols-7 gap-2 rounded-lg border bg-input-background p-4">
        {labels.map((label) => (
          <div
            key={label}
            className="pb-2 text-center text-xs text-muted-foreground"
          >
            {label}
          </div>
        ))}
        {Array.from({ length: daysInMonth }, (_, index) => {
          const day = addDays(startOfMonth(today), index);
          const onClick = () => {
            toggleCommit(day, commitments, setCommitments);
          };
          return (
            <button
              className={cn(
                " grid aspect-square cursor-pointer place-items-center rounded-lg bg-accent text-lg font-bold disabled:opacity-50",
                index === 0 && `col-start-${getDay(startOfMonth(today)) + 1}`,
                isSameDay(day, today) &&
                  "ring-2 ring-primary ring-offset-2 ring-offset-background ",
                isFuture(day) && "cursor-not-allowed",
              )}
              key={index + Math.random()}
              style={{
                backgroundColor: isInCommitments(day, commitments) ? color : "",
              }}
              onClick={onClick}
              disabled={isFuture(day)}
            >
              {index + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
};
