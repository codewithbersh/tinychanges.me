import { Suspense } from "react";

import { PageLoader } from "@/components/page-loader";
import { Header } from "../_components/header";
import { ServerForm } from "./_components/server-form";

interface HabitProps {
  params: {
    habitId: string;
  };
}

const Habit = ({ params: { habitId } }: HabitProps) => {
  return (
    <div className="flex min-h-full flex-col gap-12">
      <Header route="Daily Habit" />
      <Suspense fallback={<PageLoader />}>
        <ServerForm habitId={habitId} />
      </Suspense>
    </div>
  );
};

export default Habit;
