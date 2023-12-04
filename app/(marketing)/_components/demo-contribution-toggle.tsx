import React from "react";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";

interface DemoContributionToggleProps {
  hasContribToday: boolean;
  onToggle: () => void;
}

export const DemoContributionToggle = ({
  hasContribToday,
  onToggle,
}: DemoContributionToggleProps) => {
  return (
    <Button
      variant={hasContribToday ? "default" : "secondary"}
      onClick={onToggle}
      className="ml-auto"
    >
      <Icons.star
        className={cn("mr-2", hasContribToday && "fill-neutral-950")}
      />
      Today
    </Button>
  );
};
