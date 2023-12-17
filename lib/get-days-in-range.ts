import { addYears, eachDayOfInterval, endOfYear, startOfYear } from "date-fns";

export function getDaysInRange(input: string | null) {
  let num = Number(input);

  switch (isNaN(num)) {
    case false:
      num;
    default:
      num = 0;
  }

  const current = addYears(new Date(), num);
  const start = startOfYear(current);
  const end = endOfYear(current);
  const days = eachDayOfInterval({ start, end });

  return days;
}
