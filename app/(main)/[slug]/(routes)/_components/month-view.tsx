import { isSameDay } from "date-fns";

import { Contribution } from "./contribution";

interface MonthViewProps {
  days: Date[];
  contributions: Date[] | undefined;
  color: string;
}

export const MonthView = ({ days, contributions, color }: MonthViewProps) => {
  return (
    <div className="grid grid-flow-col grid-rows-2 gap-2 overflow-x-auto rounded-lg bg-neutral-800/50 p-4">
      {days.map((day) => {
        const hasContrib = contributions?.some((contribDay) =>
          isSameDay(day, contribDay),
        );
        return (
          <Contribution day={day.toDateString()} key={day.toDateString()}>
            <div
              className="aspect-square min-h-[20px] w-full min-w-[20px] rounded-[2px] bg-neutral-700 sm:rounded-sm"
              style={{ backgroundColor: hasContrib ? color : "" }}
            />
          </Contribution>
        );
      })}
    </div>
  );
};
