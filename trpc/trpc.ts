import { getCurrentUser } from "@/lib/get-current-user";
import { TRPCError, initTRPC } from "@trpc/server";

const t = initTRPC.create({});

const middleware = t.middleware;

const isAuth = middleware(async (opts) => {
  const user = await getCurrentUser();

  if (!user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return opts.next({
    ctx: {
      userId: user.id,
      email: user.email!,
    },
  });
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const privateProcedure = t.procedure.use(isAuth);
