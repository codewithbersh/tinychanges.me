"use client";

import {
  formatRangeFilter,
  validateRangeParams,
  validateViewParams,
} from "@/lib/utils";
import { useSearchParams } from "next/navigation";

import { MonthView } from "./month-view";

interface ContributionsProps {
  contributions: Date[] | undefined;
}

export const Contributions = ({ contributions }: ContributionsProps) => {
  const searchParams = useSearchParams();

  const view = validateViewParams(searchParams.get("view"));
  const range = validateRangeParams(searchParams.get("range"));
  const { range: filterRange, days } = formatRangeFilter({ view, range });

  switch (view) {
    case "month":
      return (
        <MonthView
          contributions={contributions}
          from={filterRange.from}
          days={days}
        />
      );
    case "year":
      return;
    default:
      return;
  }
};
