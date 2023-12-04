import { Dispatch, useState } from "react";
import { cn } from "@/lib/utils";
import { marketingConfig } from "@/config/marketing";
import { DemoAction, DemoState } from "./demo-reducer";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EmojiPopover } from "./emoji-popover";
import { DemoLabel } from "./demo-label";
import { RotateCw } from "lucide-react";
import { randomHabit } from "./demo-set-defaults";

interface DemoCreateProps {
  state: DemoState;
  dispatch: Dispatch<DemoAction>;
}

export const DemoCreate = ({ state, dispatch }: DemoCreateProps) => {
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
        <EmojiPopover dispatch={dispatch} open={open} setOpen={setOpen}>
          <div
            className="col-span-3 flex aspect-square items-center justify-center rounded-lg"
            onClick={() => setOpen(!open)}
            role="button"
            style={{ backgroundColor: state.color }}
          >
            <span className="text-5xl leading-none">{state.emoji}</span>
          </div>
        </EmojiPopover>
        <div className="col-span-9 flex flex-col justify-between gap-2">
          <div className="flex gap-2">
            {marketingConfig.colors.map((item) => (
              <div
                key={item.id}
                style={{ backgroundColor: item.hex }}
                className={cn(
                  "aspect-square w-full rounded-lg",
                  item.hex === state.color &&
                    "ring-2 ring-muted-foreground ring-offset-[1.5px] ring-offset-background",
                )}
                role="button"
                onClick={() =>
                  dispatch({ type: "setColor", payload: { color: item.hex } })
                }
              />
            ))}
          </div>

          <div className="relative h-full w-full">
            <Input
              className="h-full truncate pr-8 text-center"
              placeholder="Add a habit"
              value={state.habit}
              onChange={(e) =>
                dispatch({
                  type: "setHabit",
                  payload: { habit: e.target.value },
                })
              }
            />
            <Button
              className="absolute right-1 top-1/2  -translate-y-1/2"
              size="icon"
              variant="ghost"
              onClick={() => randomHabit({ dispatch })}
            >
              <RotateCw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
