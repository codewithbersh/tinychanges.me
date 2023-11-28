import db from "@/lib/prismadb";
import { publicProcedure, router } from "@/trpc/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { summary } from "date-streaks";

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
        const streak = summary({
          dates: contributions.map((contrib) => contrib.date),
        });

        return { contributions, total, streak };
      } catch (error) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }
    }),
});
