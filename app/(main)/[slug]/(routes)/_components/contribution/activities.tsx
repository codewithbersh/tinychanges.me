import { cn } from "@/lib/utils";

import { Icons } from "@/components/ui/icons";
import { Skeleton } from "@/components/ui/skeleton";

interface ActivitiesProps {
  streak:
    | {
        currentStreak: number;
        longestStreak: number;
        streaks: number[];
        todayInStreak: boolean;
        withinCurrentStreak: boolean;
      }
    | undefined;
  totalContributions: number | undefined;
}

export const Activities = ({ streak, totalContributions }: ActivitiesProps) => {
  return (
    <div className="flex w-full items-center gap-4">
      <Activity
        icon={<Icons.contributions />}
        count={totalContributions}
        label="contributions"
      />
      <Activity
        icon={<Icons.star />}
        count={streak?.longestStreak}
        label="longest streak"
        className="ml-auto"
      />
      <Activity
        icon={<Icons.streak />}
        count={streak?.currentStreak}
        label="current streak"
      />
    </div>
  );
};

function Activity({
  icon,
  count,
  label,
  className,
}: {
  icon: JSX.Element;
  count: number | undefined | number[];
  label: string;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {icon}
      <div>
        <span>{count ?? 0} </span>
        <span className="hidden md:inline">{label}</span>
      </div>
    </div>
  );
}

Activities.Skeleton = function SkeletonActivities() {
  return (
    <div className="flex items-center gap-2">
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
