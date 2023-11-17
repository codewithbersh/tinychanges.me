import { Suspense } from "react";
import Link from "next/link";

import { PageLoader } from "@/components/page-loader";
import { ServerForm } from "./_components/server-form";

interface DailyHabitsPageProps {
  params: {
    habitId: string;
  };
}

const DailyHabitsPage = ({ params: { habitId } }: DailyHabitsPageProps) => {
  return (
    <div className="flex min-h-full flex-col gap-12">
      <h1 className="text-lg font-semibold text-muted-foreground">
        <Link href="/dashboard" className="underline-offset-2 hover:underline">
          Dashboard
        </Link>
        / <span className="text-primary">Daily Habits</span>
      </h1>
      <Suspense fallback={<PageLoader />}>
        <ServerForm habitId={habitId} />
      </Suspense>
    </div>
  );
};

export default DailyHabitsPage;
