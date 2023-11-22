"use client";

import { useState } from "react";
import { habitConfig } from "@/config/habit";
import { useEffectOnce } from "usehooks-ts";

import { DemoCreate } from "./demo-create";
import { DemoTrack } from "./demo-track";
import { DemoUpdate } from "./demo-update";

var randomEmoji = require("random-unicode-emoji");

export const habits = [
  "Meditate 15 min",
  "Journal before bed",
  "Read 20 pages",
  "Write 500 words",
  "Morning reflection",
  "Exercise 30 min",
  "Sleep 7-8 hours",
  "Eat 5 veggies",
  "Hydrate 8 glasses",
  "Plan before bed",
  "Organize for 10 min",
  "Learn 20 min",
  "Practice music 30 min",
  "Create art piece",
  "Save $10",
  "Budget 5 min",
  "Connect with loved one",
  "Volunteer 20 min",
  "Review accomplishments",
  "1 hour screen limit",
  "10 min walk",
  "Express gratitude",
  "Daily task list",
  "Try new recipe",
  "Quick body stretch",
  "Learn language 15 min",
  "Proud moment today",
  "Breathing exercise",
  "No screens before bed",
  "Compliment someone",
  "Floss before bed",
  "Take stairs",
  "Listen to podcast",
  "10 min in nature",
  "Positive affirmation",
  "Limit caffeine 2 PM",
  "Organize workspace",
];

export const Demo = () => {
  const colors = habitConfig.colors;
  const initialColor = colors[Math.floor(colors.length * Math.random())].hex;

  const [color, setColor] = useState<string>("");
  const [emoji, setEmoji] = useState<string>("");
  const [habit, setHabit] = useState<string>("");
  const [commitments, setCommitments] = useState<Date[] | null>(null);

  useEffectOnce(() => {
    setColor(initialColor);
    setEmoji(randomEmoji.random({ count: 1 })[0]);
    setHabit(habits[Math.floor(habits.length * Math.random())]);
  });

  return (
    <>
      <DemoCreate
        color={color}
        setColor={setColor}
        habit={habit}
        setHabit={setHabit}
        emoji={emoji}
        setEmoji={setEmoji}
      />
      <DemoTrack
        color={color}
        habit={habit}
        emoji={emoji}
        commitments={commitments}
        setCommitments={setCommitments}
      />
      <DemoUpdate
        color={color}
        commitments={commitments}
        setCommitments={setCommitments}
      />
    </>
  );
};
