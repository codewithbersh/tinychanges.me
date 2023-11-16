import db from "@/lib/prismadb";
import { privateProcedure, publicProcedure, router } from "@/trpc/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const challengeRouter = router({
  get: router({
    all: privateProcedure.query(async ({ ctx }) => {
      const { userId } = ctx;

      try {
        return await db.challenge.findMany({
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
          id: z.string().optional(),
        }),
      )
      .query(async ({ ctx, input }) => {
        const { userId } = ctx;
        const { id } = input;

        try {
          if (!id || id?.toLowerCase() === "new") {
            return null;
          } else {
            return await db.challenge.findFirst({
              where: {
                id,
                userId,
              },
            });
          }
        } catch (error) {
          throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
        }
      }),
  }),
  mutate: privateProcedure
    .input(
      z.object({
        emoji: z.string(),
        challenge: z.string(),
        duration: z.string(),
        initialData: z.string().optional(),
        startDate: z.date(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx;
      const {
        emoji,
        challenge,
        duration: durationString,
        initialData,
        startDate,
      } = input;

      const duration = durationString.toLowerCase() === "week" ? 7 : 30;
      let res;

      try {
        if (initialData) {
          res = await db.challenge.update({
            where: {
              id: initialData,
            },
            data: {
              emoji,
              challenge,
              duration,
              startDate,
            },
          });
        } else {
          res = await db.challenge.create({
            data: {
              emoji,
              challenge,
              userId,
              duration,
              startDate,
            },
          });
        }

        return { id: res.id };
      } catch (error) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }
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
        await db.challenge.delete({
          where: {
            id,
            userId,
          },
        });
      } catch (error) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }
    }),
  //   public: router({
  //     getAll: publicProcedure
  //       .input(
  //         z.object({
  //           slug: z.string(),
  //         }),
  //       )
  //       .query(async ({ input }) => {
  //         const { slug } = input;

  //         try {
  //           return await db.habit.findMany({
  //             where: {
  //               user: {
  //                 slug,
  //               },
  //             },
  //             orderBy: {
  //               createdAt: "desc",
  //             },
  //           });
  //         } catch (error) {
  //           throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
  //         }
  //       }),
  //   }),
});
