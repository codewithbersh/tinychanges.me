"use client";

import { signOut } from "next-auth/react";
import { Menu } from "lucide-react";
import { Route } from "./header";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Logo } from "@/components/logo";

interface MobileNavProps {
  routes: Route[];
  isAuthenticated: boolean;
}

export const MobileNav = ({ routes, isAuthenticated }: MobileNavProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="md:hidden" variant="secondary" size="icon">
          <Menu className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <div className="pt-8">
          <Logo />
        </div>
        <div className="mt-auto  flex flex-col gap-4 ">
          {isAuthenticated &&
            routes.map((route) => (
              <Link href={route.href} passHref key={route.href}>
                <Button variant="ghost" className="w-full justify-start">
                  {route.label}
                </Button>
              </Link>
            ))}

          {isAuthenticated ? (
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              Logout
            </Button>
          ) : (
            <Link href="/login" passHref>
              <Button variant="ghost" className="w-full justify-start">
                Login
              </Button>
            </Link>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
