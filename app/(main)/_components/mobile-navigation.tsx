import { Route } from "@/types/types";
import { Menu } from "lucide-react";

interface MobileNavigationProps {
  routes: Route[];
}

export const MobileNavigation = ({ routes }: MobileNavigationProps) => {
  return (
    <div className="grid h-full w-full place-items-center">
      <Menu className="h-6 w-6" />
    </div>
  );
};
