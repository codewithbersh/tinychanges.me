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

export function validateViewParams(text: string | null) {
  switch (text?.toLowerCase()) {
    case "month":
      return "month";
    case "year":
      return "year";
    default:
      return "week";
  }
}

export function validateRangeParams(text: string | null) {
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
    case "month": {
      const current = addMonths(today, range);
      const from = startOfMonth(current);
      const currentLabel = format(current, "MMMM");
      const days = getDaysInMonth(from);

      return { from, label: currentLabel, days };
    }

    case "year": {
      const current = addYears(today, range);
      const from = startOfYear(current);
      const currentLabel = `${format(from, "yyyy")}`;
      const days = getDaysInYear(from);

      return { from, label: currentLabel, days: days };
    }

    default: {
      const current = addWeeks(today, range);
      const from = startOfWeek(current);
      const to = endOfWeek(current);
      const currentLabel = `${format(from, "MMM dd")} – ${format(
        to,
        "MMM dd",
      )}`;

      return { from, label: currentLabel, days: 7 };
    }
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
