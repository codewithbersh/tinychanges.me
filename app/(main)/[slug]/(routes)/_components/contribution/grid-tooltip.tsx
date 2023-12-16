import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface GridTooltipProps {
  children: React.ReactNode;
  day: string;
}

export const GridTooltip = ({ children, day }: GridTooltipProps) => {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>{day}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
