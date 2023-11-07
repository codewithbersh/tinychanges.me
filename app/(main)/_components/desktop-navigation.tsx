import Link from "next/link";
import { Route } from "@/types/types";
import { User } from "next-auth";

import { UserPopover } from "./user-popover";

interface DesktopNavigationProps {
  routes: Route[];
  user: User & {
    id: string;
    slug: string;
  };
}

export const DesktopNavigation = ({ routes, user }: DesktopNavigationProps) => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4">
      {routes.map(({ href, icon: Icon }) => (
        <Link
          key={href}
          className="group cursor-pointer rounded-md p-2 transition-colors hover:bg-accent"
          href={href}
        >
          <Icon className="stroke-icon h-5 w-5 text-primary transition-all duration-300 group-hover:rotate-45" />
        </Link>
      ))}

      <div className="absolute bottom-4 ">
        <UserPopover user={user} />
      </div>
    </div>
  );
};
