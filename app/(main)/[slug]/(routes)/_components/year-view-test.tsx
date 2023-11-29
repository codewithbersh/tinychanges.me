import { cn } from "@/lib/utils";

import { Contribution } from "./contribution";

export const YearViewTest = () => {
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
        {Array.from({ length: 366 }, (_, index) => (
          <Contribution day={`${index + 1}`} key={index}>
            <div className="h-4 w-4 rounded-sm bg-neutral-700" />
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
