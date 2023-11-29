import { cn } from "@/lib/utils";
import { addDays, format, getDay } from "date-fns";

import { Contribution } from "./contribution";

interface YearViewProps {
  contributions: Date[] | undefined;
  from: Date;
  days: number;
  habitColor: string;
}

export const YearView = ({
  contributions,
  days,
  from,
  habitColor,
}: YearViewProps) => {
  const dates = Array.from({ length: days }).map((_, index) => {
    const day = addDays(from, index);
    const tooltip = format(day, "MMM dd, yyyy");
    const hasContrib = !!contributions?.some(
      (contrib) => contrib.getTime() === day.getTime(),
    );
    return { day, tooltip, hasContrib };
  });

  const rowStart = getDay(from) + 1;
  return (
    <div className="grid-rows-12 hide-scrollbar grid grid-flow-col gap-2 overflow-x-auto rounded-lg bg-neutral-800 p-4">
      <div className="row-span-3 flex w-8 flex-col border ">
        <div className="grid-rows-7 mt-6 grid h-full text-end">
          {weekDays.map((day, index) => (
            <div className="grid place-items-center" key={day}>
              <span
                className={cn(
                  "text-xs font-medium text-muted-foreground",
                  index % 2 === 0 && "invisible",
                )}
              >
                {day}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="col-span-2 grid h-4 grid-cols-12 border ">
        {months.map((month) => (
          <span
            key={month}
            className="mt-auto h-fit text-xs font-medium leading-none text-muted-foreground"
          >
            {month}
          </span>
        ))}
      </div>
      <div className="grid-rows-7 col-span-2 row-span-2 grid grid-flow-col gap-1">
        {dates.map((day, index) => (
          <Contribution day={day.tooltip} key={day.tooltip}>
            <div
              className={cn(
                "h-4 w-4 rounded-sm bg-neutral-700",
                index === 0 && `row-start-${rowStart}`,
              )}
              style={{ backgroundColor: day.hasContrib ? habitColor : "" }}
            />
          </Contribution>
        ))}
      </div>
    </div>
  );
};

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const _ = [
  "row-start-1",
  "row-start-2",
  "row-start-3",
  "row-start-4",
  "row-start-5",
  "row-start-6",
  "row-start-7",
];
