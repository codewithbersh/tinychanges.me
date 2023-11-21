import { useState } from "react";
import { habitConfig } from "@/config/habit";
import { cn } from "@/lib/utils";
import { marketingConfig } from "@/config/marketing";

import { Input } from "@/components/ui/input";
import { EmojiPopover } from "./emoji-popover";
import { DemoLabel } from "./demo-label";

interface CreateProps {
  color: string;
  setColor: (val: string) => void;
  habit: string;
  setHabit: (val: string) => void;
  emoji: string;
  setEmoji: (val: string) => void;
}

export const Create = ({
  color,
  setColor,
  habit,
  setHabit,
  emoji,
  setEmoji,
}: CreateProps) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div
      className="animate-fade-up space-y-6 opacity-0"
      style={{ animationFillMode: "forwards", animationDelay: "0.60s" }}
    >
      <DemoLabel
        title={marketingConfig.create.title}
        description={marketingConfig.create.description}
      />
      <div className="grid grid-cols-12 gap-2">
        <EmojiPopover setEmoji={setEmoji} open={open} setOpen={setOpen}>
          <div
            className="col-span-3 grid aspect-square place-items-center rounded-lg"
            onClick={() => setOpen(!open)}
            role="button"
            style={{ backgroundColor: color }}
          >
            <span className="text-5xl leading-none">{emoji}</span>
          </div>
        </EmojiPopover>
        <div className="col-span-9 flex flex-col justify-between gap-2">
          <div className="flex gap-2">
            {habitConfig.colors.map((item) => (
              <div
                key={item.id}
                style={{ backgroundColor: item.hex }}
                className={cn(
                  "aspect-square w-full rounded-lg",
                  item.hex === color &&
                    "ring-2 ring-muted-foreground ring-offset-[1.5px] ring-offset-background",
                )}
                role="button"
                onClick={() => setColor(item.hex)}
              />
            ))}
          </div>

          <div className="h-full">
            <Input
              className="h-full text-center"
              placeholder="Add a habit"
              value={habit}
              onChange={(val) => setHabit(val.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
