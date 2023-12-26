"use client";

import { Dispatch } from "react";
import {
  addMonths,
  endOfMonth,
  formatISO,
  startOfMonth,
  subMonths,
} from "date-fns";
import { DemoAction, DemoState } from "./demo-reducer";
import { summary } from "date-streaks";
//@ts-ignore
import confetti from "canvas-confetti";

import ActivityCalendar from "react-activity-calendar";
import { Habit } from "@/app/(main)/[slug]/(routes)/_components/contribution/habit";
import { Activities } from "@/app/(main)/[slug]/(routes)/_components/contribution/activities";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { DemoLabel } from "./demo-label";
import { marketingConfig } from "@/config/marketing";

interface DemoTrackProps {
  state: DemoState;
  dispatch: Dispatch<DemoAction>;
}

export const DemoTrack = ({ state, dispatch }: DemoTrackProps) => {
  const today = new Date();
  const todayISO = formatISO(today, { representation: "date" });
  const start = formatISO(startOfMonth(subMonths(new Date(), 2)), {
    representation: "date",
  });
  const end = formatISO(endOfMonth(addMonths(new Date(), 2)), {
    representation: "date",
  });
  const dates = state.contributions?.map((contrib) => contrib.date);

  const hasContribToday = !!state?.contributions?.some(
    (date) => date.date === todayISO,
  );

  const onToggle = () => {
    const contribs = state.contributions;
    if (hasContribToday) {
      contribs?.pop();
    } else {
      contribs?.push({
        date: todayISO,
        count: 1,
        level: 1,
      });
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

  const streaks = summary({ dates: dates ?? [] });

  const totalContributions = state.contributions?.length;

  return (
    <div className="space-y-6">
      <DemoLabel
        title={marketingConfig.track.title}
        description={marketingConfig.track.description}
      />
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

        <ActivityCalendar
          hideTotalCount
          hideColorLegend
          maxLevel={1}
          data={[
            {
              date: start,
              level: 0,
              count: 0,
            },
            ...(state.contributions ?? []),
            {
              date: end,
              level: 0,
              count: 0,
            },
          ]}
          theme={{
            light: ["#404040", habit.color],
            dark: ["#404040", habit.color],
          }}
        />

        <Activities
          streaks={streaks}
          totalContributions={totalContributions}
          isDemo
        />
      </div>
    </div>
  );
};
