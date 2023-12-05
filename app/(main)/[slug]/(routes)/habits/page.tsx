import Link from "next/link";
import { notFound } from "next/navigation";
import { getCurrentUser } from "@/lib/get-current-user";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { HabitsList } from "./_components/habits-list";

interface HabitsPageProps {
  params: {
    slug: string;
  };
}

const HabitsPage = async ({ params: { slug } }: HabitsPageProps) => {
  const user = await getCurrentUser();

  if (!user || user.slug !== slug) {
    return notFound();
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <h1>Habits</h1>
        <Button asChild size="icon" className="ml-auto">
          <Link href={`/${user.slug}/habits/new`}>
            <Plus className="h-4 w-4" />
          </Link>
        </Button>
      </div>
      <HabitsList />
    </div>
  );
};

export default HabitsPage;
