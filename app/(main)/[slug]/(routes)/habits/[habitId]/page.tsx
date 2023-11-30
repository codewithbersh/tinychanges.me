import { notFound } from "next/navigation";
import { getCurrentUser } from "@/lib/get-current-user";

import { HabitForm } from "./_components/habit-form";

interface HabitIdPageProps {
  params: {
    habitId: string;
    slug: string;
  };
}

const HabitIdPage = async ({ params: { habitId, slug } }: HabitIdPageProps) => {
  const user = await getCurrentUser();

  if (!user || user.slug !== slug) {
    return notFound();
  }

  return <HabitForm habitId={habitId} slug={slug} />;
};

export default HabitIdPage;
