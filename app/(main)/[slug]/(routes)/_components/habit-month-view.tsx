export const HabitMonthView = () => {
  return (
    <div className="grid-cols-16 grid grid-flow-col grid-rows-2 gap-1 rounded-lg bg-neutral-800/50 p-4 sm:gap-2 ">
      {Array.from({ length: 31 }).map((_, index) => (
        <div
          className="aspect-square w-full rounded-[2px] bg-yellow-300 text-black sm:rounded-sm"
          key={index}
        />
      ))}
    </div>
  );
};
