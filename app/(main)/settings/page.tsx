import { serverTrpc } from "@/app/_trpc/server";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { UserProfile } from "./_components/user-profile";
import { Habits } from "./_components/habits";
import { Plus } from "lucide-react";

const SettingsPage = async () => {
  const user = await serverTrpc.user.private.get();

  return (
    <div className="flex flex-col gap-12">
      <h1 className="text-lg font-semibold">Settings</h1>
      <div className="flex items-center gap-4 sm:gap-6">
        <UserProfile initialData={user} />
        <Button asChild variant="secondary">
          <Link href="/settings/profile" className="ml-auto">
            Update
          </Link>
        </Button>
      </div>
      <div>
        <div>
          <div className="flex items-center justify-between">
            <h1>Daily Habits</h1>

            <Button variant="ghost" size="icon">
              <Link href="/settings/new">
                <Plus className="h-5 w-5" />
              </Link>
            </Button>
          </div>
          <Habits />
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
