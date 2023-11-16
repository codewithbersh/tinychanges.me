import { Suspense } from "react";

import { PageLoader } from "@/components/page-loader";
import { ServerForm } from "./_components/server-form";
import { Header } from "../../_components/header";

interface DailyHabitsPageProps {
  params: {
    habitId: string;
  };
}

const DailyHabitsPage = ({ params: { habitId } }: DailyHabitsPageProps) => {
  return (
    <div className="flex min-h-full flex-col gap-12">
      <Header route="Daily Habit" />
      <Suspense fallback={<PageLoader />}>
        <ServerForm habitId={habitId} />
      </Suspense>
    </div>
  );
};

export default DailyHabitsPage;
