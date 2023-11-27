import { Skeleton } from "@/components/ui/skeleton";

export const LoaderHabits = () => {
  return (
    <ul className="flex w-full flex-col gap-4">
      {Array.from({ length: 3 }).map((_, idx) => (
        <li key={idx}>
          <Skeleton className="h-14 w-full rounded-lg bg-accent" />
        </li>
      ))}
    </ul>
  );
};
