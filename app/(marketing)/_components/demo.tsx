"use client";

import { useReducer } from "react";

import { DemoCreate } from "./demo-create";
import { DemoTrack } from "./demo-track";
import { demoReducer } from "./demo-reducer";
import { DemoSetDefaults } from "./demo-set-defaults";

export const Demo = () => {
  const [state, dispatch] = useReducer(demoReducer, {
    color: "",
    emoji: "",
    habit: "",
    contributions: [],
  });

  return (
    <>
      <DemoCreate state={state} dispatch={dispatch} />
      <DemoTrack state={state} dispatch={dispatch} />
      <DemoSetDefaults dispatch={dispatch} />
    </>
  );
};
