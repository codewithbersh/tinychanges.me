import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ContributionProps {
  children: React.ReactNode;
  day: string;
}

export const Contribution = ({ children, day }: ContributionProps) => {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>{day}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
