import { type ClassValue, clsx } from "clsx";
import {
  addDays,
  addMonths,
  addWeeks,
  endOfMonth,
  endOfWeek,
  format,
  getDaysInMonth,
  startOfMonth,
  startOfToday,
  startOfWeek,
} from "date-fns";
import { twMerge } from "tailwind-merge";

type View = "weekly" | "monthly";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatViewParams(params: string | null) {
  switch (params?.toLowerCase()) {
    case "weekly":
      return "weekly";
    default:
      return "monthly";
  }
}

export function formatStatusParams(params: string | null) {
  switch (params?.toLowerCase()) {
    case "in-progress":
      return "in-progress";
    case "completed":
      return "completed";
    default:
      return "all";
  }
}

export function formatRangeParams(params: string | null) {
  const num = Number(params);

  switch (isNaN(num)) {
    case false:
      return num;
    default:
      return 0;
  }
}

export function formatRange({ view, range }: { view: View; range: number }) {
  const today = startOfToday();

  if (view === "monthly") {
    const current = addMonths(today, range);
    const from = startOfMonth(current);
    const to = endOfMonth(current);
    const currentRange = { from, to };
    const currentLabel = format(current, "MMMM");
    const days = getDaysInMonth(from);

    return { range: currentRange, label: currentLabel, days };
  } else {
    const current = addWeeks(today, range);
    const from = startOfWeek(current);
    const to = endOfWeek(current);
    const currentRange = { from, to };
    const currentLabel = `${format(from, "MMM dd")} – ${format(to, "MMM dd")}`;

    return { range: currentRange, label: currentLabel, days: 7 };
  }
}

export function formatDay({ from, index }: { from: Date; index: number }) {
  return addDays(from, index);
}
