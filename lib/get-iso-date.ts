import { formatISO } from "date-fns";

export function getISODate(date: Date) {
  return formatISO(date, { representation: "date" });
}
