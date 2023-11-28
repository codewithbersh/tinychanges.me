import { Filters } from "./_components/filters";
import { Habits } from "./_components/habits";

const SlugPage = () => {
  return (
    <div className="flex flex-col gap-8">
      <Filters />
      <Habits />
    </div>
  );
};

export default SlugPage;
