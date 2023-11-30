import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Plus } from "lucide-react";

import { Button } from "./ui/button";

export const EmptyHabits = () => {
  const params = useParams();
  const slug = params.slug;
  return (
    <div className="flex flex-col items-center gap-4 py-8 md:py-12">
      <div className=" w-56">
        <Image src="/empty-habits.png" alt="" width={2048} height={1848} />
      </div>
      <div className="space-y-2">
        <p className="text-center">No Habits</p>
        <p className="max-w-xs text-center text-muted-foreground">
          Create your first habit, click the button below to start.
        </p>
      </div>
      <Button asChild>
        <Link href={`/${slug}/habits/new`}>
          <Plus className="mr-2 h-4 w-4" />
          Create Habit
        </Link>
      </Button>
    </div>
  );
};
