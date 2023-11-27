import { serverTrpc } from "@/app/_trpc/server";
import { notFound } from "next/navigation";
import { getCurrentUser } from "@/lib/get-current-user";

import { UserAvatar } from "@/components/user-avatar";
import { ViewOptions } from "./_components/view-options";
import { HabitRangeFilter } from "./_components/habit-range-filter";
import { HabitsServer } from "./_components/habits-server";
import { Streaks } from "./_components/streaks";

interface HabitsPageProps {
  params: {
    slug: string;
  };
}

const HabitsPage = async ({ params: { slug } }: HabitsPageProps) => {
  const user = await getCurrentUser();
  const account = await serverTrpc.user.public.get({ slug });

  if (!account) {
    return notFound();
  }

  return (
    <div className="flex flex-col gap-6 md:gap-12">
      <div className="space-y-4">
        <div className="flex items-center gap-6">
          <UserAvatar
            email={account.email!}
            imageUrl={account.image}
            className="h-16 w-16 text-4xl"
          />

          <div className="flex flex-col gap-1">
            <h1 className="font-medium">{account.name}</h1>
            <p className="text-sm text-muted-foreground sm:text-base">
              {account.bio && account.bio.length > 0 ? account.bio : "No bio."}
            </p>
          </div>
        </div>

        <Streaks slug={account.slug} />
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex gap-4">
          <div className="ml-auto">
            <ViewOptions slug={slug} />
          </div>
        </div>

        <div className="mt-4 space-y-8">
          <HabitRangeFilter />
          {/* add suspense */}
          <HabitsServer slug={slug} user={user} />
        </div>
      </div>
    </div>
  );
};

export default HabitsPage;