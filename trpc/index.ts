import { waitlistRouter } from "./routers/waitlist";
import { router } from "./trpc";

export const appRouter = router({
  waitlist: waitlistRouter,
});

export type AppRouter = typeof appRouter;
