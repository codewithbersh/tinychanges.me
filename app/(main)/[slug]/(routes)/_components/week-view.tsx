import { addDays, format } from "date-fns";

import { Contribution } from "./contribution";

interface WeekViewProps {
  contributions: Date[] | undefined;
  from: Date;
  days: number;
  habitColor: string;
}

export const WeekView = ({
  contributions,
  days,
  from,
  habitColor,
}: WeekViewProps) => {
  const dates = Array.from({ length: days }).map((_, index) => {
    const day = addDays(from, index);
    const tooltip = format(day, "MMM dd, yyyy");
    const hasContrib = !!contributions?.some(
      (contrib) => contrib.getTime() === day.getTime(),
    );
    return { day, tooltip, hasContrib };
  });
  return (
    <div className="flex gap-4 rounded-lg bg-neutral-800/50 p-4 md:gap-8">
      {dates.map((date) => (
        <Contribution day={date.tooltip} key={date.tooltip}>
          <div
            key={date.tooltip}
            className="grid w-full place-items-center space-y-1"
          >
            <small className="text-xs">{format(date.day, "EEE")}</small>
            <div
              className="aspect-square w-full  max-w-[40px] rounded-sm bg-neutral-700"
              style={{ backgroundColor: date.hasContrib ? habitColor : "" }}
            />
          </div>
        </Contribution>
      ))}
    </div>
  );
};
