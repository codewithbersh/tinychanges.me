import { cn } from "@/lib/utils";

import { Icons } from "@/components/ui/icons";
import { Skeleton } from "@/components/ui/skeleton";

interface ActivitiesProps {
  streaks:
    | {
        currentStreak: number;
        longestStreak: number;
      }
    | undefined;
  totalContributions: number | undefined;
  isDemo?: true;
}

export const Activities = ({
  streaks,
  totalContributions,
  isDemo,
}: ActivitiesProps) => {
  return (
    <div className="flex w-full items-center gap-4">
      <Activity
        icon={<Icons.contributions />}
        count={totalContributions}
        label="contributions"
        isDemo={isDemo}
      />
      <Activity
        icon={<Icons.star />}
        count={streaks?.longestStreak}
        label="longest streak"
        className="ml-auto"
        isDemo={isDemo}
      />
      <Activity
        icon={<Icons.streak />}
        count={streaks?.currentStreak}
        label="current streak"
        isDemo={isDemo}
      />
    </div>
  );
};

function Activity({
  icon,
  count,
  label,
  className,
  isDemo,
}: {
  icon: JSX.Element;
  count: number | undefined | number[];
  label: string;
  className?: string;
  isDemo?: true;
}) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {icon}
      <div>
        <span>{count ?? 0} </span>
        <span className={cn("hidden md:inline", isDemo && "md:hidden")}>
          {label}
        </span>
      </div>
    </div>
  );
}

Activities.Skeleton = function SkeletonActivities() {
  return (
    <div className="flex h-6 items-center justify-center gap-2">
      <div className="flex items-center gap-2">
        <Skeleton className="h-4 w-4" />
        <Skeleton className="hidden h-4 w-[115px] md:inline" />
      </div>
      <div className="ml-auto flex items-center gap-2">
        <Skeleton className="h-4 w-4" />
        <Skeleton className="hidden h-4 w-[115px] md:inline" />
      </div>
      <div className="flex items-center gap-2">
        <Skeleton className="h-4 w-4" />
        <Skeleton className="hidden h-4 w-[115px] md:inline" />
      </div>
    </div>
  );
};
