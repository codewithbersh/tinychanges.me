import { validateRangeParams, validateViewParams } from "@/lib/utils";
import { getCurrentUser } from "@/lib/get-current-user";

import { Filters } from "./_components/filters";
import { Habits } from "./_components/habits";

interface SlugPageProps {
  params: {
    slug: string;
  };
  searchParams: { [key: string]: string | undefined };
}

const SlugPage = async ({ params: { slug }, searchParams }: SlugPageProps) => {
  const user = await getCurrentUser();
  const isOwner = user?.slug === slug;

  const view = validateViewParams(searchParams.view);
  const range = validateRangeParams(searchParams.range);

  return (
    <div className="flex flex-col gap-8">
      <Filters view={view} range={range} slug={slug} />
      <Habits slug={slug} isOwner={isOwner} />
    </div>
  );
};

export default SlugPage;
