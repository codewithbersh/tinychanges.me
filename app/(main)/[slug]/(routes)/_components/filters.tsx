"use client";

import { useEffect, useState } from "react";
import { View } from "@/lib/utils";

import { Skeleton } from "@/components/ui/skeleton";
import { ViewFilter } from "./view-filter";
import { RangeFilter } from "./range-filter";

interface FiltersProps {
  view: View;
  range: number;
  slug: string;
}

export const Filters = ({ view, range, slug }: FiltersProps) => {
  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Filters.Skeleton />;
  }
  return (
    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
      <ViewFilter view={view} slug={slug} />
      <RangeFilter range={range} slug={slug} view={view} />
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
