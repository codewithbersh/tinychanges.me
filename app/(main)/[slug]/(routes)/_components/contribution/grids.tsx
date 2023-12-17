"use client";

import { cn } from "@/lib/utils";
import { getISODate } from "@/lib/get-iso-date";

import { GridTooltip } from "./grid-tooltip";

interface GridsProps {
  days: string[];
  contributions: string[] | undefined;
  color: string;
}

export const Grids = ({ days, contributions, color }: GridsProps) => {
  return (
    <div className="grid w-fit grid-flow-col grid-rows-7 gap-1">
      {days.map((day) => {
        const hasContribution = contributions?.some(
          (contribution) => contribution === day,
        );

        return (
          <GridTooltip day={day} key={day}>
            <div
              key={day}
              className={cn(
                "h-3 w-3 rounded-[2px] bg-neutral-700",
                day === getISODate(new Date()) &&
                  !hasContribution &&
                  "border border-neutral-50",
              )}
              style={{ backgroundColor: hasContribution ? color : "" }}
            />
          </GridTooltip>
        );
      })}
    </div>
  );
};
