"use client";

import { useRouter } from "next/navigation";
import { GanttChart } from "lucide-react";
import { View } from "@/lib/utils";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ViewFilterProps {
  view: View;
  slug: string;
}

export const ViewFilter = ({ view, slug }: ViewFilterProps) => {
  const router = useRouter();

  const views = [
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
    router.push(`/${slug}?view=${value}`);
  };

  return (
    <Select onValueChange={onValueChange} defaultValue={view}>
      <SelectTrigger className="h-8 w-fit border-none">
        <GanttChart className="mr-2 h-4 w-4" />
        <SelectValue placeholder="View" />
      </SelectTrigger>
      <SelectContent>
        {views.map((view) => (
          <SelectItem value={view.value} key={view.value}>
            {view.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
