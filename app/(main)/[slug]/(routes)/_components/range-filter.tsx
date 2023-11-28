"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Type, formatRangeFilter } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface RangeFilterProps {
  range: number;
  slug: string;
  type: Type;
}

export const RangeFilter = ({ range, slug, type }: RangeFilterProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const { label } = formatRangeFilter({ type, range });

  const onClick = (val: number) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    current.set("range", val.toLocaleString());

    const search = current.toString();
    const query = search ? `?${search}` : "";

    router.push(`${pathname}${query}`);
  };

  return (
    <div className="flex w-full items-center justify-between gap-4 md:w-fit md:justify-normal">
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
