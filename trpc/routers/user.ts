import { z } from "zod";
import db from "@/lib/prismadb";
import { privateProcedure, publicProcedure, router } from "@/trpc/trpc";
import { TRPCError } from "@trpc/server";

export const userRouter = router({
  public: router({
    get: publicProcedure
      .input(
        z.object({
          slug: z.string(),
        }),
      )
      .query(async ({ input }) => {
        const { slug } = input;

        try {
          return await db.user.findFirst({
            where: {
              slug,
            },
          });
        } catch (error) {
          throw new TRPCError({ code: "BAD_REQUEST" });
        }
      }),
  }),
  private: router({
    get: privateProcedure.query(async ({ ctx }) => {
      const { userId: id } = ctx;

      try {
        const user = await db.user.findFirst({
          where: {
            id,
          },
        });

        if (!user) {
          throw new TRPCError({ code: "UNAUTHORIZED" });
        }
        return user;
      } catch (error) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }
    }),
  }),
});
