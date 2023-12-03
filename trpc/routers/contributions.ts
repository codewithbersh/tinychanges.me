import db from "@/lib/prismadb";
import { privateProcedure, publicProcedure, router } from "@/trpc/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { summary } from "date-streaks";
import { startOfDay } from "date-fns";

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
        const contributions = await db.contribution.findMany({
          where: {
            habitId,
          },
        });

        const total = contributions.length;
        const dates = contributions.map((contrib) => contrib.date);
        const streak = summary({
          dates,
        });

        return { contributions, total, streak, dates };
      } catch (error) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }
    }),
  toggleContributionToday: privateProcedure
    .input(
      z.object({
        contribTodayId: z.string().optional(),
        habitId: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { userId } = ctx;
      const { contribTodayId, habitId } = input;
      const date = startOfDay(new Date());

      try {
        let message: string;

        if (contribTodayId) {
          await db.contribution.delete({
            where: {
              id: contribTodayId,
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
