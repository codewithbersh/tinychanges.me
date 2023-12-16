"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { formatRangeFilter, validateRangeParams } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export const RangeFilter = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const range = validateRangeParams(searchParams.get("range"));
  const router = useRouter();

  const { label } = formatRangeFilter({ range });

  const onClick = (val: number) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    current.set("range", val.toLocaleString());

    const search = current.toString();
    const query = search ? `?${search}` : "";

    router.push(`${pathname}${query}`);
  };

  return (
    <div className="flex items-center justify-between gap-6">
      <Button
        size="icon"
        variant="secondary"
        onClick={() => onClick(range - 1)}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <div className="text-sm leading-none text-muted-foreground">{label}</div>
      <Button
        size="icon"
        variant="secondary"
        onClick={() => onClick(range + 1)}
        disabled={range === 0}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

RangeFilter.Skeleton = function SkeletonRangeFilter() {
  return <Skeleton className="h-8 w-[147px] rounded-md" />;
};
