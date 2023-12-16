import { type ClassValue, clsx } from "clsx";
import {
  addDays,
  addYears,
  endOfYear,
  format,
  isSameDay,
  startOfToday,
  startOfYear,
} from "date-fns";
import { twMerge } from "tailwind-merge";

export type View = "week" | "month" | "year";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function validateArchiveParams(text: string | null) {
  switch (text?.toLowerCase()) {
    case "true":
      return true;
    case "false":
      return false;
    default:
      return undefined;
  }
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

export function formatRangeFilter({ range }: { range: number }) {
  const today = startOfToday();

  const current = addYears(today, range);
  const start = startOfYear(current);
  const end = endOfYear(current);
  const currentLabel = `${format(start, "yyyy")}`;
  return { label: currentLabel, interval: { start, end } };
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
