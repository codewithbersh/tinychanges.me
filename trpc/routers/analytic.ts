import { Streaks } from "@/app/(main)/(public)/[slug]/_components/streaks";
import db from "@/lib/prismadb";
import { publicProcedure, router } from "@/trpc/trpc";
import { Commitment, CommitmentStatus } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import {
  differenceInDays,
  isToday,
  isYesterday,
  startOfToday,
  subDays,
} from "date-fns";
import { z } from "zod";
import { summary } from "date-streaks";

type CommitmentWithHabit = {
  id: string;
  habitId: string;
  date: Date;
  status: CommitmentStatus;
  habit: {
    emoji: string;
    color: string;
  };
};

type GroupedCommitments = {
  [habitId: string]: CommitmentWithHabit[];
};

type Habit = {
  emoji: string;
  color: string;
};

type Streaks = {
  [habitId: string]: {
    habit: Habit;
    streak: number;
  };
};

export const analyticRouter = router({
  getStreaks: publicProcedure
    .input(
      z.object({
        slug: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const { slug } = input;

      try {
        const commitments = await db.commitment.findMany({
          where: {
            habit: {
              user: {
                slug,
              },
            },
          },
          orderBy: {
            date: "desc",
          },
          include: {
            habit: {
              select: {
                color: true,
                emoji: true,
              },
            },
          },
        });

        const group = groupByHabitId(commitments);
        const keys = Object.keys(group);
        const streaks: Streaks = {};

        keys.forEach((habitId) => {
          const arr = group[habitId];

          const dates = arr.map((item) => item.date);
          const streak = summary({ dates }).currentStreak;

          if (streak > 0) {
            streaks[habitId] = { habit: arr[0].habit, streak };
          }
        });

        return sortStreaks(streaks);
      } catch (error) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }
    }),
});

function groupByHabitId(
  commitments: CommitmentWithHabit[],
): GroupedCommitments {
  const groupedResults: GroupedCommitments = {};

  commitments.forEach((commitment) => {
    const { habitId } = commitment;

    if (groupedResults[habitId]) {
      groupedResults[habitId].push(commitment);
    } else {
      groupedResults[habitId] = [commitment];
    }
  });

  return groupedResults;
}

function sortStreaks(habits: Streaks): Streaks {
  const sortedHabits: Streaks = {};

  const habitArray: [string, { habit: Habit; streak: number }][] =
    Object.entries(habits);

  habitArray.sort((a, b) => b[1].streak - a[1].streak);

  habitArray.forEach(([key, value]) => {
    sortedHabits[key] = value;
  });

  return sortedHabits;
}
