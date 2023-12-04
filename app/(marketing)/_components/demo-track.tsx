"use client";

import { Dispatch } from "react";
import {
  eachDayOfInterval,
  endOfMonth,
  isSameDay,
  startOfMonth,
} from "date-fns";
import { marketingConfig } from "@/config/marketing";
import { DemoLabel } from "./demo-label";
import { DemoAction, DemoState } from "./demo-reducer";
import { summary } from "date-streaks";
//@ts-ignore
import confetti from "canvas-confetti";

import { MonthView } from "@/app/(main)/[slug]/(routes)/_components/month-view";
import { StreakAndContribs } from "@/app/(main)/[slug]/(routes)/_components/streak-and-contribs";
import { DemoContributionToggle } from "./demo-contribution-toggle";

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

  const hasContribToday = !!state?.contributions?.some((date) =>
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

  const streak = state.contributions
    ? summary({ dates: state.contributions }).currentStreak
    : 0;

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
            <div className="flex flex-col justify-between truncate">
              <div className="truncate font-medium">{state.habit}</div>
              <StreakAndContribs
                streak={streak}
                contribs={state.contributions?.length}
                className="flex"
              />
            </div>
            <DemoContributionToggle
              hasContribToday={hasContribToday}
              onToggle={onToggle}
            />
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
