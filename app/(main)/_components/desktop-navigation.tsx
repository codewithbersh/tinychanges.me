import Link from "next/link";
import { Route } from "@/types/types";

interface DesktopNavigationProps {
  routes: Route[];
}

export const DesktopNavigation = ({ routes }: DesktopNavigationProps) => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4">
      {routes.map(({ href, icon: Icon }) => (
        <Link
          key={href}
          className="cursor-pointer rounded-md p-2 transition-colors hover:bg-accent"
          href={href}
        >
          <Icon className="h-5 w-5 text-primary" />
        </Link>
      ))}
    </div>
  );
};
