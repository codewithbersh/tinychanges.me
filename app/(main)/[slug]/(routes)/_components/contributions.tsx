"use client";

import {
  formatRangeFilter,
  validateRangeParams,
  validateViewParams,
} from "@/lib/utils";
import { useSearchParams } from "next/navigation";

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
      return;
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
