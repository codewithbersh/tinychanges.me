import { serverTrpc } from "@/app/_trpc/server";
import { notFound } from "next/navigation";
import { getCurrentUser } from "@/lib/get-current-user";
import { formatType } from "@/lib/utils";

import { UserAvatar } from "@/components/user-avatar";
import { ViewOptions } from "./_components/view-options";
import { ViewOptionActions } from "./_components/view-option-actions";
import { ServerHabits } from "./_components/server-habits";
import { Type } from "./_components/type";

interface HabitsPageProps {
  params: {
    slug: string;
  };
  searchParams: { [key: string]: string | undefined };
}

const HabitsPage = async ({
  params: { slug },
  searchParams,
}: HabitsPageProps) => {
  const user = await getCurrentUser();
  const account = await serverTrpc.user.public.get({ slug });

  if (!account) {
    return notFound();
  }

  const type = formatType({ type: searchParams.type, slug });

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
          <Type type={type} />
          <div className="ml-auto">
            <ViewOptions slug={slug} hidden={type.challenges} />
          </div>
        </div>

        <div className="mt-4 space-y-8">
          {!type.challenges && (
            <>
              <ViewOptionActions />
              <ServerHabits slug={slug} user={user} />
            </>
          )}

          {type.challenges && <></>}
        </div>
      </div>
    </div>
  );
};

export default HabitsPage;
