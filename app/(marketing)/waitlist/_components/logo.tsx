"use client";

import { useWaitlistStatus } from "@/hooks/use-waitlist-status";
import { cn } from "@/lib/utils";

const contributions = [
  {
    delay: "1s",
    completed: true,
  },
  {
    delay: "0.15s",
    completed: false,
  },
  {
    delay: "0.45s",
    completed: false,
  },
  {
    delay: "0.75s",
    completed: false,
  },
];

export const Logo = () => {
  const { isSuccess } = useWaitlistStatus();

  return (
    <div className="grid grid-cols-2 gap-1">
      {contributions.map((contribution, index) => (
        <div
          className={cn(
            "h-6 w-6 animate-fade-up rounded-sm bg-primary/25 opacity-0",
            contribution.completed && "bg-primary",
            isSuccess && index === 1 && "bg-primary",
          )}
          style={{
            animationDelay: contribution.delay,
            animationFillMode: "forwards",
          }}
          key={contribution.delay}
        />
      ))}
    </div>
  );
};
