import db from "@/lib/prismadb";
import { privateProcedure, router } from "@/trpc/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const habitRouter = router({
  add: privateProcedure
    .input(
      z.object({
        emoji: z.string(),
        color: z.string(),
        habit: z.string(),
        initialData: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx;
      const { emoji, color, habit, initialData } = input;

      let res;

      try {
        if (initialData) {
          res = await db.habit.update({
            where: {
              id: initialData,
            },
            data: {
              emoji,
              color,
              habit,
            },
          });
        } else {
          res = await db.habit.create({
            data: {
              emoji,
              color,
              habit,
              userId,
            },
          });
        }

        return { id: res.id };
      } catch (error) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }
    }),
  get: router({
    all: privateProcedure.query(async ({ ctx }) => {
      const { userId } = ctx;

      try {
        return await db.habit.findMany({
          where: {
            userId,
          },
          orderBy: {
            createdAt: "desc",
          },
        });
      } catch (error) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }
    }),
    byId: privateProcedure
      .input(
        z.object({
          id: z.string(),
        }),
      )
      .query(async ({ ctx, input }) => {
        const { userId } = ctx;
        const { id } = input;

        try {
          if (id.toLowerCase() === "new") {
            return null;
          } else {
            return await db.habit.findFirst({
              where: {
                id,
              },
            });
          }
        } catch (error) {
          throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
        }
      }),
  }),
  delete: privateProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx;
      const { id } = input;

      try {
        await db.habit.delete({
          where: {
            id,
          },
        });
      } catch (error) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }
    }),
});
