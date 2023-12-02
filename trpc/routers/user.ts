import { z } from "zod";
import { privateProcedure, publicProcedure, router } from "@/trpc/trpc";
import { TRPCError } from "@trpc/server";
import db from "@/lib/prismadb";
import { utapi } from "@/lib/utapi";
import slugify from "@sindresorhus/slugify";
import { habitConfig } from "@/config/habit";

export const userRouter = router({
  getUserBySlug: publicProcedure
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
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }
    }),

  getAuthUser: privateProcedure.query(async ({ ctx }) => {
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

      return user;
    } catch (error) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
  }),

  updateUser: privateProcedure
    .input(
      z.object({
        name: z.string().nullable(),
        slug: z.string(),
        twitterHandle: z.string().nullable(),
        oldSlug: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx;
      const { name, slug, twitterHandle, oldSlug } = input;

      const invalidSlugs = ["habits", "profile", "settings", "dashboard"];

      const slugified = slugify(slug);

      try {
        const slugIsTaken = await db.user.findFirst({
          where: {
            slug: slugified,
          },
        });

        if (
          (slugIsTaken || invalidSlugs.includes(slugified)) &&
          oldSlug !== slug
        ) {
          return { ok: false, message: "Link is taken." };
        }

        const user = await db.user.update({
          where: {
            id: userId,
          },
          data: {
            name,
            slug: slugified,
            twitterHandle,
          },
        });

        return { ok: true, message: "Profile updated.", user };
      } catch (error) {
        throw new TRPCError({ code: "BAD_REQUEST" });
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

      const { image, email, slug } = user;
      return { image, email, slug };
    } catch (error) {
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    }
  }),

  updateImage: privateProcedure
    .input(
      z.object({
        image: z.string().nullable(),
        oldImage: z.string().optional().nullable(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx;
      const { image, oldImage } = input;

      const defaultImageUrls = habitConfig.defaultAvatarImages.reduce(
        (arr: string[], curr) => {
          arr.push(curr.value);
          return arr;
        },
        [],
      );

      try {
        if (oldImage) {
          const fileName = extractFileName(oldImage);

          if (fileName && image !== oldImage) {
            if (!defaultImageUrls.includes(oldImage)) {
              await utapi.deleteFiles([fileName.trim()]);
            }
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
});

function extractFileName(url: string) {
  const prefix = "https://utfs.io/f/";

  if (url && url.startsWith(prefix)) {
    return url.substring(prefix.length);
  }

  return null;
}
