import { addDays, format } from "date-fns";

import { Contribution } from "./contribution";

interface MonthViewProps {
  contributions: Date[] | undefined;
  from: Date;
  days: number;
  habitColor: string;
}

export const MonthView = ({
  contributions,
  days,
  from,
  habitColor,
}: MonthViewProps) => {
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
            className="aspect-square w-full rounded-[2px] bg-neutral-700 text-black sm:rounded-sm"
            style={{ backgroundColor: date.hasContrib ? habitColor : "" }}
          />
        </Contribution>
      ))}
    </div>
  );
};
