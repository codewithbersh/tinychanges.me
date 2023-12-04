import { format, isSameDay } from "date-fns";

import { Contribution } from "./contribution";

interface WeekViewProps {
  days: Date[];
  contributions: Date[] | undefined;
  color: string;
}

export const WeekView = ({ days, contributions, color }: WeekViewProps) => {
  return (
    <div className="flex gap-4 rounded-lg bg-neutral-800/50 p-4 md:gap-8">
      {days.map((day) => {
        const hasContrib = contributions?.some((contribDay) =>
          isSameDay(day, contribDay),
        );
        return (
          <Contribution day={day.toDateString()} key={day.toDateString()}>
            <div className="grid w-full place-items-center space-y-1">
              <small className="text-xs">{format(day, "EEE")}</small>
              <div
                className="aspect-square w-full  max-w-[40px] rounded-sm bg-neutral-700"
                style={{ backgroundColor: hasContrib ? color : "" }}
              />
            </div>
          </Contribution>
        );
      })}
    </div>
  );
};
