import db from "@/lib/prismadb";
import { privateProcedure, publicProcedure, router } from "@/trpc/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const habitRouter = router({
  getByHabitId: privateProcedure
    .input(
      z.object({
        habitId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { habitId } = input;
      const { userId } = ctx;
      try {
        return await db.habit.findFirst({
          where: {
            id: habitId,
            userId,
          },
        });
      } catch (error) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
    }),

  getAll: publicProcedure
    .input(
      z.object({
        slug: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const { slug } = input;

      try {
        return await db.habit.findMany({
          where: {
            user: {
              slug,
            },
          },
        });
      } catch (error) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }
    }),

  create: privateProcedure
    .input(
      z.object({
        emoji: z.string(),
        habit: z.string(),
        color: z.string(),
        id: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx;
      const { emoji, habit, color, id } = input;

      try {
        if (id) {
          return await db.habit.update({
            where: {
              id,
            },
            data: {
              userId,
              emoji,
              habit,
              color,
            },
          });
        } else {
          return await db.habit.create({
            data: {
              userId,
              emoji,
              habit,
              color,
            },
          });
        }
      } catch (error) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }
    }),
});
