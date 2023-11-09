import { router } from "./trpc";

import { userRouter } from "./routers/user";
import { waitlistRouter } from "./routers/waitlist";
import { adminRouter } from "./routers/admin";

export const appRouter = router({
  waitlist: waitlistRouter,
  user: userRouter,
  admin: adminRouter,
});

export type AppRouter = typeof appRouter;
