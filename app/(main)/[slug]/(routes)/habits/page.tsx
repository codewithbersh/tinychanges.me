import { HabitsList } from "./_components/habits-list";
import { CreateHabitLink } from "./_components/create-habit-link";

const HabitsPage = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <h1>Habits</h1>
        <CreateHabitLink />
      </div>
      <HabitsList />
    </div>
  );
};

export default HabitsPage;
