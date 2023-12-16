import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { trpc } from "@/app/_trpc/client";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";

interface ToggleProps {
  contributionId: string | undefined;
  habitId: string;
}

export const Toggle = ({ contributionId, habitId }: ToggleProps) => {
  const params = useParams();
  const { data: session } = useSession();
  const utils = trpc.useUtils();

  const { mutate: toggle, isLoading } =
    trpc.contribution.toggleContributionToday.useMutation();

  const isOwner = params["slug"] === session?.user.slug;

  const onToggle = () => {
    toggle(
      { contributionId, habitId },
      {
        onSuccess: ({ message }) => {
          toast.success(message);
          utils.contribution.getAllByHabitId.invalidate({ habitId });
          utils.user.getUserTotalContributions.invalidate({
            slug: params["slug"] as string,
          });
        },
      },
    );
  };
  return (
    <>
      {contributionId ? (
        <Button className="text-neutral-950" onClick={onToggle}>
          <Icons.star className="mr-2 fill-neutral-950" />
          Today
        </Button>
      ) : (
        <Button variant="secondary" onClick={onToggle}>
          <Icons.star className="mr-2" />
          Today
        </Button>
      )}
    </>
  );
};
