"use client";

import {
  formatRangeFilter,
  validateRangeParams,
  validateViewParams,
} from "@/lib/utils";
import { useSearchParams } from "next/navigation";

import { WeekView } from "./week-view";
import { MonthView } from "./month-view";
import { YearView } from "./year-view";

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
  const { from, days } = formatRangeFilter({ view, range });

  switch (view) {
    case "month":
      return (
        <MonthView
          contributions={contributions}
          from={from}
          days={days}
          habitColor={habitColor}
        />
      );
    case "year":
      return (
        <YearView
          contributions={contributions}
          from={from}
          days={days}
          habitColor={habitColor}
        />
      );
    default:
      return (
        <WeekView
          contributions={contributions}
          from={from}
          days={days}
          habitColor={habitColor}
        />
      );
  }
};
