"use client";

import { isSameDay } from "date-fns";

import { Contribution } from "./contribution";

interface YearViewProps {
  days: Date[];
  contributions: Date[] | undefined;
  color: string;
}

export const YearView = ({ days, contributions, color }: YearViewProps) => {
  return (
    <div className="grid grid-flow-col grid-rows-7 gap-1 overflow-x-auto rounded-lg bg-neutral-800/50 p-4">
      {days.map((day) => {
        const hasContrib = contributions?.some((contribDay) =>
          isSameDay(contribDay, day),
        );
        return (
          <Contribution day={day.toDateString()} key={day.toDateString()}>
            <div
              className="aspect-square min-h-[8px] w-full min-w-[8px] rounded-[2px] bg-neutral-700"
              style={{ backgroundColor: hasContrib ? color : "" }}
            />
          </Contribution>
        );
      })}
    </div>
  );
};
