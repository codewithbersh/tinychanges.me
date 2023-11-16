import { router } from "./trpc";

import { userRouter } from "./routers/user";
import { waitlistRouter } from "./routers/waitlist";
import { adminRouter } from "./routers/admin";
import { habitRouter } from "./routers/habit";
import { commitmentRouter } from "./routers/commitment";
import { challengeRouter } from "./routers/challenge";

export const appRouter = router({
  waitlist: waitlistRouter,
  user: userRouter,
  admin: adminRouter,
  habit: habitRouter,
  challenge: challengeRouter,
  commitment: commitmentRouter,
});

export type AppRouter = typeof appRouter;
