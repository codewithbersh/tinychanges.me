"use client";

import { isSameDay } from "date-fns";

import { GridTooltip } from "./grid-tooltip";

interface GridsProps {
  days: Date[];
  contributions: Date[] | undefined;
  color: string;
}

export const Grids = ({ days, contributions, color }: GridsProps) => {
  return (
    <div className="grid min-w-[844px] grid-flow-col grid-rows-7 gap-1">
      {days.map((day) => {
        const hasContrib = contributions?.some((contribDay) =>
          isSameDay(contribDay, day),
        );

        return (
          <GridTooltip day={day.toDateString()} key={day.toDateString()}>
            <div
              key={day.toDateString()}
              className="h-3 w-3 rounded-[2px] bg-neutral-700"
              style={{ backgroundColor: hasContrib ? color : "" }}
            />
          </GridTooltip>
        );
      })}
    </div>
  );
};
