import { Suspense } from "react";

import { PageLoader } from "@/components/page-loader";
import { Header } from "../_components/header";
import { ServerForm } from "./_components/server-form";

interface DailyHabitsPageProps {
  params: {
    habitId: string;
  };
}

const DailyHabitsPage = ({ params: { habitId } }: DailyHabitsPageProps) => {
  return (
    <div className="flex min-h-full flex-col gap-12">
      <Header route={habitId} label="Daily Habits" />
      <Suspense fallback={<PageLoader />}>
        <ServerForm habitId={habitId} />
      </Suspense>
    </div>
  );
};

export default DailyHabitsPage;
