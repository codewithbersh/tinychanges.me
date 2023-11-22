import { z } from "zod";
import { privateProcedure, publicProcedure, router } from "@/trpc/trpc";
import { TRPCError } from "@trpc/server";
import db from "@/lib/prismadb";
import { utapi } from "@/lib/utapi";
import slugify from "@sindresorhus/slugify";

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
      const { userId } = ctx;

      try {
        const user = await db.user.findFirst({
          where: {
            id: userId,
          },
        });

        if (!user) {
          throw new TRPCError({ code: "UNAUTHORIZED" });
        }

        const { id, name, email, slug, bio } = user;
        return { id, name, email, slug, bio };
      } catch (error) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }
    }),
    getImage: privateProcedure.query(async ({ ctx }) => {
      const { userId } = ctx;

      try {
        const user = await db.user.findFirst({
          where: {
            id: userId,
          },
        });

        if (!user) {
          throw new TRPCError({ code: "UNAUTHORIZED" });
        }

        const { image, email } = user;
        return { image, email };
      } catch (error) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }
    }),
    update: privateProcedure
      .input(
        z.object({
          name: z.string().nullable(),
          bio: z.string().nullable(),
          slug: z.string(),
        }),
      )
      .mutation(async ({ ctx, input }) => {
        const { userId } = ctx;
        const { name, bio, slug } = input;

        try {
          const hasDuplicate = await db.user.findFirst({
            where: {
              NOT: {
                id: userId,
              },
              slug,
            },
          });

          if (hasDuplicate) {
            return { ok: false, message: "Link is taken." };
          }

          await db.user.update({
            where: {
              id: userId,
            },
            data: {
              name,
              bio,
              slug: slugify(slug),
            },
          });
          return { ok: true, message: "Profile updated." };
        } catch (error) {
          return { ok: false, message: "An error has occured." };
        }
      }),
    updateImage: privateProcedure
      .input(
        z.object({
          image: z.string().nullable(),
          oldImage: z.string().nullable(),
        }),
      )
      .mutation(async ({ ctx, input }) => {
        const { userId } = ctx;
        const { image, oldImage } = input;

        try {
          if (oldImage) {
            const fileName = extractFileName(oldImage);

            if (fileName && image !== oldImage) {
              await utapi.deleteFiles([fileName.trim()]);
            }
          }

          await db.user.update({
            where: {
              id: userId,
            },
            data: {
              image,
            },
          });
          return { ok: true, message: "Image uploaded." };
        } catch (error) {
          return { ok: false, message: "An error has occured." };
        }
      }),
  }),
});

function extractFileName(url: string) {
  const prefix = "https://utfs.io/f/";

  if (url && url.startsWith(prefix)) {
    return url.substring(prefix.length);
  }

  return null;
}
