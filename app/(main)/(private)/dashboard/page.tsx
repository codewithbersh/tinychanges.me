import { serverTrpc } from "@/app/_trpc/server";
import Link from "next/link";
import { Suspense } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { UserProfile } from "./_components/user-profile";
import { ServerHabits } from "./_components/server-habits";
import { LoaderHabits } from "./_components/loader-habits";
import { Header } from "./_components/header";

const SettingsPage = async () => {
  const user = await serverTrpc.user.private.get();

  return (
    <div className="flex flex-col gap-12">
      <Header />
      <div className="flex items-center gap-4 sm:gap-6">
        <UserProfile initialData={user} />
        <Button asChild variant="secondary">
          <Link href="/dashboard/profile" className="ml-auto">
            Update
          </Link>
        </Button>
      </div>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1>Daily Habits</h1>

          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard/new">
              <Plus className="h-5 w-5" />
            </Link>
          </Button>
        </div>

        <Suspense fallback={<LoaderHabits />}>
          <ServerHabits />
        </Suspense>
      </div>
    </div>
  );
};

export default SettingsPage;
