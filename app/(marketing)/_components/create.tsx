import { useState } from "react";
import { habitConfig } from "@/config/habit";
import { cn } from "@/lib/utils";
import { marketingConfig } from "@/config/marketing";

import { RotateCw } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EmojiPopover } from "./emoji-popover";
import { DemoLabel } from "./demo-label";
import { habits } from "./demo";

var randomEmoji = require("random-unicode-emoji");

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
  const colors = habitConfig.colors;
  const randomColor = colors[Math.floor(colors.length * Math.random())].hex;

  const random = () => {
    setColor(randomColor);
    setEmoji(randomEmoji.random({ count: 1 })[0]);
    setHabit(habits[Math.floor(habits.length * Math.random())]);
  };
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

          <div className="relative h-full">
            <Input
              className="h-full truncate pr-8 text-center"
              placeholder="Add a habit"
              value={habit}
              onChange={(val) => setHabit(val.target.value)}
            />
            <Button
              variant="ghost"
              className="absolute right-0 top-0 h-10 w-10 bg-none text-muted-foreground hover:text-primary"
              onClick={random}
            >
              <RotateCw className="h-4 w-4 bg-none" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
