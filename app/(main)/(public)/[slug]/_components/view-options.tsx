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

export const ViewOptions = () => {
  const router = useRouter();
  const pathname = usePathname();
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

  const onSelect = (initialValue: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    const value = initialValue.toString();

    if (!value) {
      current.delete("view");
    } else {
      current.set("view", value);
    }

    const search = current.toString();

    const query = search ? `?${search}` : "";

    router.push(`${pathname}${query}`);
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
