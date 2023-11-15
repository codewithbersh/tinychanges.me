"use client";

import { cn, formatViewParams } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { buttonVariants } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ViewOptionsProps {
  slug: string;
}

export const ViewOptions = ({ slug }: ViewOptionsProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const viewParams = formatViewParams(searchParams.get("view"));

  const viewOptions = [
    {
      label: "Weekly",
      value: "weekly",
    },
    {
      label: "Monthly",
      value: "monthly",
    },
  ];

  const onSelect = (view: string) => {
    router.push(`/${slug}?view=${view}`);
  };

  return (
    <Select defaultValue="monthly" value={viewParams} onValueChange={onSelect}>
      <SelectTrigger
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "h-[35px] border-none text-muted-foreground",
        )}
      >
        <SelectValue placeholder="Select habit view" />
      </SelectTrigger>
      <SelectContent>
        {viewOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
