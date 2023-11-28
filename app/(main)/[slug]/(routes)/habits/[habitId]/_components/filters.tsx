"use client";

import { useEffect, useState } from "react";
import { Type } from "@/lib/utils";
import { RangeFilter } from "./range-filter";
import { TypeFilter } from "./type-filter";

import { Skeleton } from "@/components/ui/skeleton";

interface FiltersProps {
  type: Type;
  range: number;
  slug: string;
}

export const Filters = ({ type, range, slug }: FiltersProps) => {
  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Filters.Skeleton />;
  }
  return (
    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
      <TypeFilter type={type} slug={slug} />
      <RangeFilter range={range} slug={slug} type={type} />
    </div>
  );
};

Filters.Skeleton = function SkeletonFilters() {
  return (
    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
      <Skeleton className="h-8 w-24 rounded-md" />
      <Skeleton className="h-8 w-full rounded-md md:w-24" />
    </div>
  );
};
