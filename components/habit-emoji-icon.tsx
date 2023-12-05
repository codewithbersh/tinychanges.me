import { cn } from "@/lib/utils";

interface HabitEmojiIconProps {
  color: string;
  emoji: string;
  className?: string;
}

export const HabitEmojiIcon = ({
  color,
  emoji,
  className,
}: HabitEmojiIconProps) => {
  return (
    <div
      className={cn(
        "grid h-8 w-8 place-items-center rounded-md leading-none",
        className,
      )}
      style={{ backgroundColor: color }}
    >
      <span>{emoji}</span>
    </div>
  );
};
