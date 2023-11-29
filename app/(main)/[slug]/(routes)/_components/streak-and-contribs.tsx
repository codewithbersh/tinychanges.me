import { cn } from "@/lib/utils";

import { Icons } from "@/components/ui/icons";

interface StreakAndContribsProps {
  streak: number | undefined;
  contribs: number | undefined;
  className?: string;
}

export const StreakAndContribs = ({
  streak,
  contribs,
  className,
}: StreakAndContribsProps) => {
  return (
    <div className={cn("gap-4", className)}>
      <div className="flex items-center gap-1">
        <Icons.contributions className="h-4 w-4" />
        <div className="text-sm">{contribs}</div>
      </div>

      <div className="flex items-center gap-1">
        <Icons.streak className="h-4 w-4" />
        <div className="text-sm">{streak}</div>
      </div>
    </div>
  );
};
