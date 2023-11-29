"use client";

import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";
import { trpc } from "@/app/_trpc/client";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";

interface ContributeTodayToggleProps {
  contribTodayId: string | undefined;
  habitId: string;
}

export const ContributeTodayToggle = ({
  contribTodayId,
  habitId,
}: ContributeTodayToggleProps) => {
  const params = useParams();
  const { data: session } = useSession();
  const utils = trpc.useUtils();

  const { mutate: toggle, isLoading } =
    trpc.contribution.toggleContributionToday.useMutation();

  const isOwner = params["slug"] === session?.user.slug;

  const onToggle = () => {
    toggle(
      { contribTodayId, habitId },
      {
        onSuccess: ({ message }) => {
          toast.success(message);
          utils.contribution.getAllByHabitId.invalidate({ habitId });
        },
      },
    );
  };

  return (
    <>
      {isOwner && (
        <Button
          variant={contribTodayId ? "default" : "secondary"}
          onClick={onToggle}
          disabled={isLoading}
        >
          <Icons.star
            className={cn("mr-2", contribTodayId && "fill-neutral-950")}
          />
          Today
        </Button>
      )}
    </>
  );
};
