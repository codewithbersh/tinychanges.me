"use client";

import { useRouter } from "next/navigation";
import { GanttChart } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Type } from "@/lib/utils";

interface TypeFilterProps {
  type: Type;
  slug: string;
}

export const TypeFilter = ({ type, slug }: TypeFilterProps) => {
  const router = useRouter();

  const types = [
    {
      label: "Week",
      value: "week",
    },
    {
      label: "Month",
      value: "month",
    },
    {
      label: "Year",
      value: "year",
    },
  ];

  const onValueChange = (value: string) => {
    router.push(`/${slug}?type=${value}`);
  };

  return (
    <Select onValueChange={onValueChange} defaultValue={type}>
      <SelectTrigger className="h-8 w-fit border-none">
        <GanttChart className="mr-2 h-4 w-4" />
        <SelectValue placeholder="View" />
      </SelectTrigger>
      <SelectContent>
        {types.map((type) => (
          <SelectItem value={type.value} key={type.value}>
            {type.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
