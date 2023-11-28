import { type ClassValue, clsx } from "clsx";
import {
  addDays,
  addMonths,
  addWeeks,
  addYears,
  endOfMonth,
  endOfWeek,
  endOfYear,
  format,
  getDaysInMonth,
  getDaysInYear,
  isSameDay,
  startOfMonth,
  startOfToday,
  startOfWeek,
  startOfYear,
} from "date-fns";
import { twMerge } from "tailwind-merge";

export type View = "week" | "month" | "year";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function validateViewParams(text: string | undefined) {
  switch (text?.toLowerCase()) {
    case "month":
      return "month";
    case "year":
      return "year";
    default:
      return "week";
  }
}

export function validateRangeParams(text: string | undefined) {
  const num = Number(text);
  switch (isNaN(num)) {
    case false:
      return num;

    default:
      return 0;
  }
}

export function formatRangeFilter({
  view,
  range,
}: {
  view: View;
  range: number;
}) {
  const today = startOfToday();

  switch (view) {
    case "month":
      var current = addMonths(today, range);
      var from = startOfMonth(current);
      var to = endOfMonth(current);
      var currentRange = { from, to };
      var currentLabel = format(current, "MMMM");
      var days = getDaysInMonth(from);

      return { range: currentRange, label: currentLabel, days };

    case "year":
      var current = addYears(today, range);
      var from = startOfYear(current);
      var to = endOfYear(current);
      var currentRange = { from, to };
      var currentLabel = `${format(from, "yyyy")}`;
      var days = getDaysInYear(from);

      return { range: currentRange, label: currentLabel, days: days };

    default:
      var current = addWeeks(today, range);
      var from = startOfWeek(current);
      var to = endOfWeek(current);
      var currentRange = { from, to };
      var currentLabel = `${format(from, "MMM dd")} – ${format(to, "MMM dd")}`;

      return { range: currentRange, label: currentLabel, days: 7 };
  }
}

export function formatDay({ from, index }: { from: Date; index: number }) {
  return addDays(from, index);
}

export function toggleCommit(
  day: Date,
  commitments: Date[] | null,
  setCommitment: (values: Date[]) => void,
) {
  if (!commitments) {
    return null;
  }

  if (commitments.some((date) => isSameDay(date, day))) {
    setCommitment(commitments.filter((date) => !isSameDay(day, date)));
  } else {
    setCommitment([...commitments, day]);
  }
}

export function isInCommitments(day: Date, days: Date[] | null) {
  return days?.some((date) => isSameDay(date, day));
}
