import { serverTrpc } from "@/app/_trpc/server";

import { FormChallenge } from "./form-challenge";

interface ServerFormProps {
  challengeId: string;
}

export const ServerForm = async ({ challengeId }: ServerFormProps) => {
  const challenge = await serverTrpc.challenge.get.byId({ id: challengeId });

  return <FormChallenge initialData={challenge} />;
};
