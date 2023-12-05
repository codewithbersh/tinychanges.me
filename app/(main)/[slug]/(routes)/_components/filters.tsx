"use client";

import { useEffect, useState } from "react";

import { ViewFilter } from "./view-filter";
import { HabitsLink } from "./habits-link";
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
      <div className="flex gap-4">
        <ViewFilter />
        <HabitsLink />
      </div>
      <RangeFilter />
    </div>
  );
};

Filters.Skeleton = function SkeletonFilters() {
  return (
    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
      <div className="flex gap-4">
        <ViewFilter.Skeleton />
        <HabitsLink.Skeleton />
      </div>
      <RangeFilter.Skeleton />
    </div>
  );
};
