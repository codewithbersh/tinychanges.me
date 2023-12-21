import { addYears, endOfYear, formatISO, startOfYear } from "date-fns";

export function getRange(input: string | null) {
  let num = Number(input);

  if (isNaN(num)) {
    num = 0;
  }

  const current = addYears(new Date(), num);
  const start = formatISO(startOfYear(current), { representation: "date" });
  const end = formatISO(endOfYear(current), { representation: "date" });
  return { start, end };
}
