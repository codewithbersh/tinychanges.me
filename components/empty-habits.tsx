import Link from "next/link";
import { LayoutGrid, Plus } from "lucide-react";

import { Button } from "./ui/button";

export const EmptyHabits = () => {
  return (
    <div className="space-y-6 py-12 text-center font-medium leading-none">
      <LayoutGrid strokeWidth="1" className="mx-auto h-12 w-12" />
      <div className="flex flex-col gap-2">
        <h1>No Habits</h1>
        <p className="text-muted-foreground ">Start creating your habit</p>
        <Link href="/dashboard/new" passHref>
          <Button className="mx-auto mt-2 w-fit">
            <Plus className="mr-2 h-4 w-4" />
            Create Habit
          </Button>
        </Link>
      </div>
    </div>
  );
};
