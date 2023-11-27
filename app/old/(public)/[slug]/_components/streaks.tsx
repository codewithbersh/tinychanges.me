import { serverTrpc } from "@/app/_trpc/server";
import { StreaksClient } from "./streaks-client";

export const Streaks = async ({ slug }: { slug: string }) => {
  const streaks = await serverTrpc.analytic.getStreaks({ slug });

  return (
    <div className="relative w-full rounded-lg bg-neutral-100 p-4 dark:bg-neutral-900">
      <div className="absolute -top-2 left-6 h-4 w-4 rotate-45 bg-neutral-100 dark:bg-neutral-900" />

      <StreaksClient slug={slug} initialData={streaks} />
    </div>
  );
};
