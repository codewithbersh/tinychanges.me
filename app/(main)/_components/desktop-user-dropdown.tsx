"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { GetPrivateUser } from "@/types/types";
import { trpc } from "@/app/_trpc/client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserAvatar } from "@/components/user-avatar";

interface DesktopUserDropdownProps {
  initialData: GetPrivateUser;
  className?: string;
}

export const DesktopUserDropdown = ({
  initialData,
  className,
}: DesktopUserDropdownProps) => {
  const { data: user } = trpc.user.private.get.useQuery(undefined, {
    initialData,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={className}>
        <UserAvatar imageUrl={user.image} email={user.email!} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[260px] shadow-sm">
        <DropdownMenuLabel className="flex items-center gap-2">
          <UserAvatar
            imageUrl={user.image}
            email={user.email!}
            className="h-6 w-6"
          />

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
