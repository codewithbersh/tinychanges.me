"use client";

import { formatRange, formatRangeParams, formatViewParams } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

export const ViewOptionActions = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const view = formatViewParams(searchParams.get("view"));
  const range = formatRangeParams(searchParams.get("range"));

  const onClick = (val: number) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    current.set("range", val.toLocaleString());

    const search = current.toString();
    const query = search ? `?${search}` : "";

    router.push(`${pathname}${query}`);
  };

  const { label } = formatRange({ view, range });

  return (
    <div className="flex items-center justify-between gap-6">
      <Button
        variant="secondary"
        className="h-8 w-8 shrink-0 p-0"
        onClick={() => onClick(range - 1)}
        type="button"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <div className="w-full flex-1 truncate text-center">{label}</div>
      <Button
        variant="secondary"
        className="h-8 w-8 shrink-0 p-0"
        onClick={() => onClick(range + 1)}
        type="button"
        disabled={range === 0}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};
