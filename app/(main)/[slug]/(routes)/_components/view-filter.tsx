"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { GanttChart } from "lucide-react";
import { View, validateViewParams } from "@/lib/utils";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const ViewFilter = () => {
  const searchParams = useSearchParams();
  const params = useParams();

  const slug = params["slug"];
  const view = validateViewParams(searchParams.get("view"));

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
