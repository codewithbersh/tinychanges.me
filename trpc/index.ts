import { router } from "./trpc";

import { userRouter } from "./routers/user";
import { waitlistRouter } from "./routers/waitlist";

export const appRouter = router({
  waitlist: waitlistRouter,
  user: userRouter,
});

export type AppRouter = typeof appRouter;
