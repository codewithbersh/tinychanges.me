import Link from "next/link";
import { GetPrivateUser, Route } from "@/types/types";
import { UserDropdown } from "./user-dropdown";

interface DesktopNavigationProps {
  routes: Route[];
  initialData: GetPrivateUser;
}

export const DesktopNavigation = ({
  routes,
  initialData,
}: DesktopNavigationProps) => {
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

      <UserDropdown initialData={initialData} className="absolute bottom-4" />
    </div>
  );
};
