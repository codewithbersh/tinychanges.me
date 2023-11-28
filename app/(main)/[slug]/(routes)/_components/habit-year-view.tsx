export const HabitYearView = () => {
  return (
    <div className="hide-scrollbar flex gap-6 overflow-x-auto rounded-lg bg-neutral-800/50 p-4">
      {Array.from({ length: 12 }).map((_, index) => (
        <div className="flex flex-col items-center gap-1.5" key={index}>
          <div className="text-xs text-muted-foreground">Jan</div>
          <div className="grid-rows-8 grid w-fit grid-flow-col gap-1">
            {Array.from({ length: 31 }).map((_, index) => (
              <div
                key={index}
                className="h-3 w-3 rounded-[2px] bg-yellow-300"
              ></div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
