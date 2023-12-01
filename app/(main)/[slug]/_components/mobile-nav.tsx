"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { Menu } from "lucide-react";
import { Route } from "./header";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Logo } from "@/components/logo";

interface MobileNavProps {
  routes: Route[];
  isAuthenticated: boolean;
}

export const MobileNav = ({ routes, isAuthenticated }: MobileNavProps) => {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
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
              <Button
                variant="ghost"
                className="w-full justify-start"
                key={route.href}
                onClick={() => {
                  setOpen(false);
                  router.push(route.href);
                }}
              >
                {route.label}
              </Button>
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
