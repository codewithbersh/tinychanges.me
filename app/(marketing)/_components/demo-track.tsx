"use client";

import { Dispatch } from "react";
import {
  eachDayOfInterval,
  endOfMonth,
  isSameDay,
  startOfMonth,
  subDays,
} from "date-fns";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { marketingConfig } from "@/config/marketing";
import { DemoLabel } from "./demo-label";
import { useEffectOnce } from "usehooks-ts";
import { DemoAction, DemoState } from "./demo-reducer";

import { MonthView } from "@/app/(main)/[slug]/(routes)/_components/month-view";

//@ts-ignore
import confetti from "canvas-confetti";

interface DemoTrackProps {
  state: DemoState;
  dispatch: Dispatch<DemoAction>;
}

export const DemoTrack = ({ state, dispatch }: DemoTrackProps) => {
  const today = new Date();
  const days = eachDayOfInterval({
    start: startOfMonth(today),
    end: endOfMonth(today),
  });

  useEffectOnce(() => {
    const contribs = eachDayOfInterval({
      start: startOfMonth(new Date()),
      end: subDays(new Date(), 1),
    });

    dispatch({ type: "setContribs", payload: { contributions: contribs } });
  });

  const hasContribToday = state?.contributions?.some((date) =>
    isSameDay(date, new Date()),
  );

  const onToggle = () => {
    const contribs = state.contributions;
    if (hasContribToday) {
      contribs?.pop();
    } else {
      contribs?.push(new Date());
      confetti({
        particleCount: 200,
        spread: 360,
        origin: { y: 0.4 },
        colors: [state.color],
      });
    }
    dispatch({ type: "setContribs", payload: { contributions: contribs } });
  };

  return (
    <div
      className="animate-fade-up space-y-2 opacity-0"
      style={{ animationFillMode: "forwards", animationDelay: "0.75s" }}
    >
      <div className="space-y-6 ">
        <DemoLabel
          title={marketingConfig.track.title}
          description={marketingConfig.track.description}
        />

        <div className="space-y-4 rounded-lg">
          <div className="flex items-center gap-2">
            <div
              className=" flex aspect-square h-12 items-center justify-center rounded-md text-2xl leading-none"
              style={{ backgroundColor: state.color }}
            >
              {state.emoji}
            </div>
            <div className="truncate font-medium">{state.habit}</div>
            <div
              className={cn(
                "ml-auto grid h-9 w-9 place-items-center rounded-full bg-neutral-300 text-primary dark:bg-neutral-800",
              )}
              role="button"
              style={{
                backgroundColor: hasContribToday ? state.color : "",
              }}
              onClick={onToggle}
            >
              <Check className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>
      <MonthView
        color={state.color ?? ""}
        days={days}
        contributions={state.contributions}
      />
    </div>
  );
};
