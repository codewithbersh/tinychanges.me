import { serverTrpc } from "@/app/_trpc/server";
import { notFound } from "next/navigation";
import { getCurrentUser } from "@/lib/get-current-user";

import { UserAvatar } from "@/components/user-avatar";
import { ViewOptions } from "./_components/view-options";
import { ViewOptionActions } from "./_components/view-option-actions";
import { ServerHabits } from "./_components/server-habits";

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
    <div className="flex flex-col gap-12">
      <div className="flex items-center gap-6">
        <UserAvatar
          email={account.email!}
          imageUrl={account.image}
          className="h-16 w-16 text-4xl"
        />

        <div className="flex flex-col gap-1">
          <h1 className="font-medium">{account.name}</h1>
          <p className="text-muted-foreground">
            {account.bio && account.bio.length > 0 ? account.bio : "No bio."}
          </p>
        </div>
      </div>
      {/* add status */}

      <div className="flex flex-col gap-6">
        <div className="flex gap-4">
          <div className="ml-auto">
            <ViewOptions />
          </div>
        </div>

        <div>
          <ViewOptionActions />
        </div>

        <div className="mt-2">
          <ServerHabits slug={slug} user={user} />
        </div>
      </div>
    </div>
  );
};

export default HabitsPage;
