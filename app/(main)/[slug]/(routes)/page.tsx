import { validateRangeParams, validateTypeParams } from "@/lib/utils";
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
  const typeParams = validateTypeParams(searchParams.type);
  const rangeParams = validateRangeParams(searchParams.range);
  const user = await getCurrentUser();
  const isOwner = user?.slug === slug;

  return (
    <div className="flex flex-col gap-8">
      <Filters type={typeParams} range={rangeParams} slug={slug} />
      <Habits slug={slug} isOwner={isOwner} />
    </div>
  );
};

export default SlugPage;
