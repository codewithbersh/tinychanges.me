"use client";

import { useEffect, useState } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { ViewFilter } from "./view-filter";
import { RangeFilter } from "./range-filter";

export const Filters = () => {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Filters.Skeleton />;
  }

  return (
    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
      <ViewFilter />
      <RangeFilter />
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
