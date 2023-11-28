import { validateRangeParams, validateTypeParams } from "@/lib/utils";
import { Filters } from "./habits/[habitId]/_components/filters";

interface SlugPageProps {
  params: {
    slug: string;
  };
  searchParams: { [key: string]: string | undefined };
}

const SlugPage = ({ params: { slug }, searchParams }: SlugPageProps) => {
  const typeParams = validateTypeParams(searchParams.type);
  const rangeParams = validateRangeParams(searchParams.range);

  return (
    <div>
      <Filters type={typeParams} range={rangeParams} slug={slug} />
    </div>
  );
};

export default SlugPage;
