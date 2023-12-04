"use client";

import {
  formatRangeFilter,
  validateRangeParams,
  validateViewParams,
} from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { eachDayOfInterval, isWithinInterval } from "date-fns";

import { YearView } from "./year-view";
import { MonthView } from "./month-view";
import { WeekView } from "./week-view";

interface ContributionsProps {
  contributions: Date[] | undefined;
  habitColor: string;
}

export const Contributions = ({
  contributions,
  habitColor,
}: ContributionsProps) => {
  const searchParams = useSearchParams();
  const view = validateViewParams(searchParams.get("view"));
  const range = validateRangeParams(searchParams.get("range"));
  const { interval } = formatRangeFilter({ view, range });

  const days = eachDayOfInterval(interval);
  const contribtuonsWithinInterval = contributions?.filter((date) =>
    isWithinInterval(date, interval),
  );

  switch (view) {
    case "month":
      return (
        <MonthView
          color={habitColor}
          days={days}
          contributions={contribtuonsWithinInterval}
        />
      );
    case "year":
      return (
        <YearView
          color={habitColor}
          days={days}
          contributions={contribtuonsWithinInterval}
        />
      );
    default:
      return (
        <WeekView
          color={habitColor}
          days={days}
          contributions={contribtuonsWithinInterval}
        />
      );
  }
};
