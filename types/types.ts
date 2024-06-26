import { LucideIcon } from "lucide-react";
import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { AppRouter } from "@/trpc";

type RouterInput = inferRouterInputs<AppRouter>;
type RouterOutput = inferRouterOutputs<AppRouter>;

export type Route = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export type GetAllHabits = RouterOutput["habit"]["getAll"];
