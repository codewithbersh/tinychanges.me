import { Route } from "./header";

import { Logo } from "@/components/logo";
import { MobileNav } from "./mobile-nav";
import { DesktopNav } from "./desktop-nav";

interface NavbarProps {
  routes: Route[];
  isAuthenticated: boolean;
}

export const Navbar = ({ routes, isAuthenticated }: NavbarProps) => {
  return (
    <div className="mx-auto max-w-2xl">
      <div className="flex items-center justify-between">
        <Logo />
        <MobileNav routes={routes} isAuthenticated={isAuthenticated} />
        <DesktopNav routes={routes} isAuthenticated={isAuthenticated} />
      </div>
    </div>
  );
};
