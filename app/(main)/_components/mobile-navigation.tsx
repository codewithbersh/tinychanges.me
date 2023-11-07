import { Route } from "@/types/types";
import { Menu } from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";

interface MobileNavigationProps {
  routes: Route[];
}

export const MobileNavigation = ({ routes }: MobileNavigationProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="fixed bottom-6 left-6 grid h-12 w-12 cursor-pointer place-items-center rounded-full border shadow-md sm:hidden">
          <Menu className="stroke-icon h-6 w-6" />
        </div>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="flex max-w-[330px] flex-col p-9 pb-24 sm:max-w-[330px]"
      >
        <div className="mt-auto flex flex-col gap-4">
          {routes.map(({ href, label, icon: Icon }) => (
            <Link
              href={href}
              className="flex items-center gap-3 rounded-md p-2 transition-colors hover:bg-accent"
              key={href}
            >
              <Icon className="stroke-icon h-5 w-5" />
              <span className="font-normal">{label}</span>
            </Link>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};
