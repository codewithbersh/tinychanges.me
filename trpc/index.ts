import { router } from "./trpc";

import { userRouter } from "./routers/user";
import { waitlistRouter } from "./routers/waitlist";
import { adminRouter } from "./routers/admin";
import { habitRouter } from "./routers/habit";
import { commitmentRouter } from "./routers/commitment";
import { analyticRouter } from "./routers/analytic";

export const appRouter = router({
  waitlist: waitlistRouter,
  user: userRouter,
  admin: adminRouter,
  habit: habitRouter,
  commitment: commitmentRouter,
  analytic: analyticRouter,
});

export type AppRouter = typeof appRouter;
