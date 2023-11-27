import { router } from "./trpc";

import { userRouter } from "./routers/user";
import { waitlistRouter } from "./routers/waitlist";
import { adminRouter } from "./routers/admin";
import { habitRouter } from "./routers/habit";

export const appRouter = router({
  waitlist: waitlistRouter,
  user: userRouter,
  admin: adminRouter,
  habit: habitRouter,
});

export type AppRouter = typeof appRouter;
