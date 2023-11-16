import { serverTrpc } from "@/app/_trpc/server";

import { Challenges } from "./challenges";

export const ServerChallenges = async () => {
  const habits = await serverTrpc.challenge.get.all();

  return <Challenges initialData={habits} />;
};
