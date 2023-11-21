"use client";

import { useState } from "react";

import { Create } from "./create";
import { Track } from "./track";
import { Update } from "./update";

export const Demo = () => {
  const [color, setColor] = useState<string>("#22c55e");
  const [emoji, setEmoji] = useState<string>("🏃🏻‍♂️");
  const [habit, setHabit] = useState<string>("Walk 15 minutes");
  const [commitments, setCommitments] = useState<Date[] | null>(null);

  return (
    <>
      <Create
        color={color}
        setColor={setColor}
        habit={habit}
        setHabit={setHabit}
        emoji={emoji}
        setEmoji={setEmoji}
      />
      <Track
        color={color}
        habit={habit}
        emoji={emoji}
        commitments={commitments}
        setCommitments={setCommitments}
      />
      <Update
        color={color}
        commitments={commitments}
        setCommitments={setCommitments}
      />
    </>
  );
};
