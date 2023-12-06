import db from "@/lib/prismadb";
import { privateProcedure, router } from "@/trpc/trpc";
import { TRPCError } from "@trpc/server";

export const adminRouter = router({
  get: router({
    waitlist: privateProcedure.query(async ({ ctx }) => {
      const { email } = ctx;

      if (email !== "brucesalcedo.programming@gmail.com") {
        return { ok: false as const };
      }

      const waitlists = await db.waitlist.findMany({
        orderBy: {
          submittedAt: "desc",
        },
      });

      return { ok: true as const, waitlists };
    }),
    users: privateProcedure.query(async ({ ctx }) => {
      const { userId } = ctx;

      try {
        return await db.user.findMany();
      } catch (error) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }
    }),
  }),
});
