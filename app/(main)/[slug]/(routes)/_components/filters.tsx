"use client";

import { useEffect, useState } from "react";

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
    <div className="flex items-center justify-between">
      <RangeFilter />
      <HabitsLink />
    </div>
  );
};

Filters.Skeleton = function SkeletonFilters() {
  return (
    <div className="flex items-center justify-between">
      <RangeFilter.Skeleton />
      <HabitsLink.Skeleton />
    </div>
  );
};
