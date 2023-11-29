import { addDays, format } from "date-fns";
import { cn } from "@/lib/utils";

import { Contribution } from "./contribution";

interface MonthViewProps {
  contributions: Date[] | undefined;
  from: Date;
  days: number;
}

export const MonthView = ({ contributions, days, from }: MonthViewProps) => {
  const dates = Array.from({ length: days }).map((_, index) => {
    const day = addDays(from, index);
    const tooltip = format(day, "MMM dd, yyyy");
    const hasContrib = !!contributions?.some(
      (contrib) => contrib.getTime() === day.getTime(),
    );
    return { day, tooltip, hasContrib };
  });

  return (
    <div className="grid grid-flow-col grid-cols-16 grid-rows-2 gap-1 rounded-lg bg-neutral-800/50 p-4 sm:gap-2 ">
      {dates.map((date) => (
        <Contribution day={date.tooltip} key={date.tooltip}>
          <div
            className={cn(
              "aspect-square w-full rounded-[2px] bg-neutral-700 text-black sm:rounded-sm",
              date.hasContrib && "bg-red-500",
            )}
          />
        </Contribution>
      ))}
    </div>
  );
};
