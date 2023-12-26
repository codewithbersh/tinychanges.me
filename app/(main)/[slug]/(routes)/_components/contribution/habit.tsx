import { Skeleton } from "@/components/ui/skeleton";

interface HabitProps {
  emoji: string;
  habit: string;
}

export const Habit = ({ emoji, habit }: HabitProps) => {
  return (
    <div className="flex items-center gap-2 truncate">
      <span className="text-xl leading-none">{emoji}</span>
      <span className="truncate text-sm font-medium">{habit}</span>
    </div>
  );
};

Habit.Skeleton = function SkeletonHabit() {
  return (
    <div className="flex items-center gap-2">
      <Skeleton className="h-5 w-5" />
      <Skeleton className="h-5 w-24" />
    </div>
  );
};
