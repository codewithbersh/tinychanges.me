import { serverTrpc } from "@/app/_trpc/server";
import Link from "next/link";

import { UserAvatar } from "@/components/user-avatar";
import { Button } from "@/components/ui/button";

const SettingsPage = async () => {
  const user = await serverTrpc.user.private.get();
  return (
    <div className="flex flex-col gap-12">
      <h1 className="text-lg font-semibold">Settings</h1>
      <div className="flex items-center gap-4 sm:gap-6">
        <UserAvatar
          imageUrl={user.image}
          email={user.email!}
          className="h-16 w-16 cursor-default text-4xl"
        />
        <div className="flex flex-col truncate">
          <h2 className="truncate">
            {user.name ?? (
              <span className="text-muted-foreground">No name</span>
            )}
          </h2>
          <p className="truncate">
            {user.bio ?? <span className="text-muted-foreground">No bio</span>}
          </p>
        </div>
        <Button asChild>
          <Link href="/settings/profile" className="ml-auto">
            Update
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default SettingsPage;
