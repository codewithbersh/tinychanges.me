import { getISODate } from "@/lib/get-iso-date";
import { TActivity } from "@/trpc/routers/contributions";

export type DemoState = {
  color: string | undefined;
  emoji: string | undefined;
  habit: string | undefined;
  contributions: TActivity[] | undefined;
};

export type DemoAction = {
  type:
    | "setColor"
    | "setEmoji"
    | "setHabit"
    | "setContribs"
    | "addContribToday"
    | "removeContribToday";
  payload: {
    color?: string;
    emoji?: string;
    habit?: string;
    contributions?: TActivity[];
  };
};

export function demoReducer(state: DemoState, action: DemoAction) {
  switch (action.type) {
    case "setColor":
      return { ...state, color: action.payload.color };
    case "setEmoji":
      return { ...state, emoji: action.payload.emoji };
    case "setHabit":
      return { ...state, habit: action.payload.habit };
    case "setContribs":
      return { ...state, contributions: action.payload.contributions };
    case "addContribToday": {
      const contributions = state.contributions;
      contributions?.push({
        date: getISODate(new Date()),
        level: 1,
        count: 1,
      });
      return { ...state, contributions };
    }
    case "removeContribToday": {
      const contributions = state.contributions;
      contributions?.push({
        date: getISODate(new Date()),
        level: 1,
        count: 1,
      });
      return { ...state, contributions };
    }

    default:
      return state;
  }
}
