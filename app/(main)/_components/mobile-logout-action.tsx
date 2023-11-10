"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

import { Button } from "@/components/ui/button";

export const MobileLogoutAction = () => {
  return (
    <Button
      variant="ghost"
      className="h-8 w-full justify-start px-2 py-0"
      onClick={() => signOut({ callbackUrl: "/" })}
    >
      <LogOut className="stroke-icon mr-2 h-5 w-5" /> Logout
    </Button>
  );
};
