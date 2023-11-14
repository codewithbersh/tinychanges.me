import { serverTrpc } from "@/app/_trpc/server";
import { notFound } from "next/navigation";

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
  const user = await serverTrpc.user.public.get({ slug });

  if (!user) {
    return notFound();
  }

  return (
    <div className="flex flex-col gap-12">
      <div className="flex items-center gap-6">
        <UserAvatar
          email={user.email!}
          imageUrl={user.image}
          className="h-16 w-16 text-4xl"
        />

        <div className="flex flex-col gap-1">
          <h1 className="font-medium">{user.name}</h1>
          <p className="text-muted-foreground">
            {user.bio && user.bio.length > 0 ? user.bio : "No bio."}
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
          <ServerHabits slug={slug} />
        </div>
      </div>
    </div>
  );
};

export default HabitsPage;
