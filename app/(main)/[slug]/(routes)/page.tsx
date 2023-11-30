import { Filters } from "./_components/filters";
import { Habits } from "./_components/habits";

const SlugPage = () => {
  return (
    <div className="flex flex-col gap-12 md:gap-16">
      <Filters />
      <Habits />
    </div>
  );
};

export default SlugPage;
