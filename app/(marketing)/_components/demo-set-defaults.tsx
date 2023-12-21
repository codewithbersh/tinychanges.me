"use client";

import { Dispatch } from "react";
import { marketingConfig } from "@/config/marketing";
import { useEffectOnce } from "usehooks-ts";
import { eachDayOfInterval, startOfMonth, subDays } from "date-fns";
import { getISODate } from "@/lib/get-iso-date";

import { DemoAction } from "./demo-reducer";

interface DemoSetDefaultsProps {
  dispatch: Dispatch<DemoAction>;
}

export const DemoSetDefaults = ({ dispatch }: DemoSetDefaultsProps) => {
  useEffectOnce(() => {
    const contribs = eachDayOfInterval({
      start: startOfMonth(new Date()),
      end: subDays(new Date(), 1),
    });

    dispatch({
      type: "setContribs",
      payload: {
        contributions: contribs.map((contrib) => {
          return { date: getISODate(contrib), level: 1, count: 1 };
        }),
      },
    });
    randomHabit({ dispatch });
  });

  return null;
};

export function randomHabit({ dispatch }: DemoSetDefaultsProps) {
  dispatch({
    type: "setColor",
    payload: {
      color:
        marketingConfig.colors[
          Math.floor(Math.random() * marketingConfig.colors.length)
        ].hex,
    },
  });

  dispatch({
    type: "setHabit",
    payload: {
      habit:
        marketingConfig.habits[
          Math.floor(Math.random() * marketingConfig.habits.length)
        ],
    },
  });

  dispatch({
    type: "setEmoji",
    payload: {
      emoji:
        marketingConfig.emojis[
          Math.floor(Math.random() * marketingConfig.emojis.length)
        ],
    },
  });
}
