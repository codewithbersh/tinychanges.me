import db from "@/lib/prismadb";
import { privateProcedure, router } from "@/trpc/trpc";

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
  }),
});
