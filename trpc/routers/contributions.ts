import db from "@/lib/prismadb";
import { privateProcedure, publicProcedure, router } from "@/trpc/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { summary } from "date-streaks";
import { getISODate } from "@/lib/get-iso-date";

export const contributionRouter = router({
  getAllByHabitId: publicProcedure
    .input(
      z.object({
        habitId: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const { habitId } = input;

      try {
        const res = await db.contribution.findMany({
          where: {
            habitId,
          },
        });

        const contributions = res.map((contrib) => contrib.date);
        const streaks = summary({
          dates: contributions,
        });

        return { contributions, streaks };
      } catch (error) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }
    }),
  toggleContributionToday: privateProcedure
    .input(
      z.object({
        hasContribToday: z.boolean(),
        habitId: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const { hasContribToday, habitId } = input;
      const date = getISODate(new Date());

      try {
        let message: string;

        if (hasContribToday) {
          await db.contribution.deleteMany({
            where: {
              date,
            },
          });

          message = "Contribution removed.";
        } else {
          await db.contribution.create({
            data: {
              habitId: habitId,
              date,
            },
          });

          message = "Contributed today.";
        }

        return { ok: true, message };
      } catch (error) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }
    }),
});
