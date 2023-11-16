import { Suspense } from "react";

import { PageLoader } from "@/components/page-loader";
import { ServerForm } from "./_components/server-form";
import { Header } from "../../_components/header";

interface ChallengesPage {
  params: {
    challengeId: string;
  };
}

const ChallengesPage = ({ params: { challengeId } }: ChallengesPage) => {
  return (
    <div className="flex min-h-full flex-col gap-12">
      <Header route="Challenge" />
      <Suspense fallback={<PageLoader />}>
        <ServerForm challengeId={challengeId} />
      </Suspense>
    </div>
  );
};

export default ChallengesPage;
