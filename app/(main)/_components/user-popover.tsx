"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "next-auth";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface UserPopover {
  user: User & {
    id: string;
    slug: string;
  };
}

export const UserPopover = ({ user }: UserPopover) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="h-8 w-8 cursor-pointer">
          {user.image ? (
            <>
              <AvatarImage src={user.image} />
            </>
          ) : null}
          <AvatarFallback className="font-medium">
            {user.email![0].toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[260px] shadow-sm">
        <DropdownMenuLabel className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            {user.image ? (
              <>
                <AvatarImage src={user.image} />
              </>
            ) : null}
            <AvatarFallback className="font-medium">
              {user.email![0].toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <h1 className="truncate">{user.name ? user.name : "Anonymous"}</h1>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={() => signOut({ callbackUrl: "/login" })}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
