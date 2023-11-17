import { cn } from "@/lib/utils";

interface HabitEmojiProps {
  color: string;
  emoji: string;
  className?: string;
}

export const Emoji = ({ color, emoji, className }: HabitEmojiProps) => {
  return (
    <div
      className={cn("grid h-7 w-7 place-items-center rounded-md", className)}
      style={{ backgroundColor: color }}
    >
      <span className="leading-none">{emoji}</span>
    </div>
  );
};
