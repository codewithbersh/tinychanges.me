"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { GanttChart } from "lucide-react";
import { validateArchiveParams } from "@/lib/utils";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const ArchivedFilter = () => {
  const searchParams = useSearchParams();
  const params = useParams();

  const slug = params["slug"];
  const view = validateArchiveParams(searchParams.get("archive"));

  const router = useRouter();

  const views = [
    {
      label: "All",
      value: "all",
    },
    {
      label: "Active",
      value: "false",
    },
    {
      label: "Archived",
      value: "true",
    },
  ];

  const onValueChange = (value: string) => {
    router.push(`/${slug}/habits?archived=${value}`);
  };

  return (
    <Select onValueChange={onValueChange} defaultValue={view?.toString() ?? ""}>
      <SelectTrigger className="h-8 w-fit border-none">
        <GanttChart className="mr-2 h-4 w-4" />
        <SelectValue placeholder="All" />
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
