import { z } from "zod";
import db from "@/lib/prismadb";
import { publicProcedure, router } from "@/trpc/trpc";
import { TRPCError } from "@trpc/server";

export const userRouter = router({
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
});
