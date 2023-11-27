"use client";

import Link from "next/link";
import { Route } from "./header";
import { signOut } from "next-auth/react";

import { Button } from "@/components/ui/button";

interface DesktopNavProps {
  routes: Route[];
  isAuthenticated: boolean;
}

export const DesktopNav = ({ routes, isAuthenticated }: DesktopNavProps) => {
  return (
    <div className="hidden gap-4 md:flex">
      {isAuthenticated &&
        routes.map((route) => (
          <Link href={route.href} key={route.href} passHref>
            <Button variant="ghost" className="text-muted-foreground">
              {route.label}
            </Button>
          </Link>
        ))}

      {isAuthenticated ? (
        <Button
          variant="ghost"
          className="text-muted-foreground"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          Logout
        </Button>
      ) : (
        <Link href="/login" passHref>
          <Button variant="ghost" className="text-muted-foreground">
            Login
          </Button>
        </Link>
      )}
    </div>
  );
};
