import { serverTrpc } from "@/app/_trpc/server";
import { StreaksClient } from "./streaks-client";

export const Streaks = async ({ slug }: { slug: string }) => {
  const streaks = await serverTrpc.analytic.getStreaks({ slug });

  return (
    <div className="relative w-full rounded-lg bg-secondary p-4">
      <div className="absolute -top-2 left-6 h-4 w-4 rotate-45 bg-secondary" />

      <StreaksClient slug={slug} initialData={streaks} />
    </div>
  );
};
