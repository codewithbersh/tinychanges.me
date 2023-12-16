"use client";

import { Dispatch } from "react";
import {
  addMonths,
  eachDayOfInterval,
  isSameDay,
  startOfMonth,
  subMonths,
} from "date-fns";
import { DemoAction, DemoState } from "./demo-reducer";
import { summary } from "date-streaks";
//@ts-ignore
import confetti from "canvas-confetti";

import { Habit } from "@/app/(main)/[slug]/(routes)/_components/contribution/habit";
import { Grids } from "@/app/(main)/[slug]/(routes)/_components/contribution/grids";
import { Activities } from "@/app/(main)/[slug]/(routes)/_components/contribution/activities";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";

interface DemoTrackProps {
  state: DemoState;
  dispatch: Dispatch<DemoAction>;
}

export const DemoTrack = ({ state, dispatch }: DemoTrackProps) => {
  const today = new Date();
  const days = eachDayOfInterval({
    start: subMonths(startOfMonth(today), 2),
    end: addMonths(startOfMonth(today), 3),
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

  const habit = {
    id: "",
    emoji: state.emoji ?? "",
    habit: state.habit ?? "",
    color: state.color ?? "",
  };

  const streak = summary({ dates: state.contributions ?? [] });

  const totalContributions = state.contributions?.length;

  return (
    <div
      className="flex animate-fade-up flex-col gap-4 rounded-md bg-neutral-800/50 p-4 opacity-0"
      style={{ animationFillMode: "forwards", animationDelay: "0.75s" }}
    >
      <div className="flex items-center justify-between">
        <Habit emoji={habit.emoji} habit={habit.habit} />

        {hasContribToday ? (
          <Button className="text-neutral-950" onClick={onToggle}>
            <Icons.star className="mr-2 fill-neutral-950" />
            Today
          </Button>
        ) : (
          <Button variant="secondary" onClick={onToggle}>
            <Icons.star className="mr-2" />
            Today
          </Button>
        )}
      </div>

      <div className="overflow-x-auto">
        <Grids
          days={days}
          contributions={state.contributions}
          color={habit.color}
        />
      </div>

      <Activities
        streak={streak}
        totalContributions={totalContributions}
        isDemo
      />
    </div>
  );
};
