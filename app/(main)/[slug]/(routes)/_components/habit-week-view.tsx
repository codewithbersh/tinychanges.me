export const HabitWeekView = () => {
  return (
    <div className="flex gap-4 rounded-lg bg-neutral-800/50 p-4 md:gap-8">
      {Array.from({ length: 7 }).map((_, index) => (
        <div key={index} className="grid w-full place-items-center space-y-1">
          <small className="text-xs">Sun</small>
          <div className="aspect-square w-full  max-w-[40px] rounded-sm bg-yellow-300" />
        </div>
      ))}
    </div>
  );
};
