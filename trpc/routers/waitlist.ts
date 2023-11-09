import { z } from "zod";
import { publicProcedure, router } from "@/trpc/trpc";
import db from "@/lib/prismadb";

export const waitlistRouter = router({
  add: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
      }),
    )
    .mutation(async ({ input }) => {
      const { email } = input;

      try {
        const emailExists = await db.waitlist.findFirst({
          where: {
            email,
          },
        });

        if (!emailExists) {
          await db.waitlist.create({
            data: {
              email,
            },
          });
        }

        return { ok: true, message: "You have been added to the waitlist." };
      } catch (error) {
        return { ok: false, message: "An error has occured." };
      }
    }),
});
