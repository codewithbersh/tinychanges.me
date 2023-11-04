import { z } from "zod";
import { publicProcedure, router } from "@/trpc/trpc";
import db from "@/lib/prismadb";

export const waitlistRouter = router({
  add: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
      })
    )
    .mutation(async ({ input }) => {
      const { email } = input;

      try {
        const emailExists = await db.waitlist.findFirst({
          where: {
            email,
          },
        });

        let message: string;

        if (emailExists) {
          message = "You have been added to the waitlist. 😉";
        } else {
          await db.waitlist.create({
            data: {
              email,
            },
          });

          message = "You have been added to the waitlist.";
        }

        return { ok: true, message };
      } catch (error) {
        return { ok: false, message: "An error has occured." };
      }
    }),
});
