"use client";

import { LayoutGrid, LogOut, Menu, Settings2 } from "lucide-react";
import { signOut } from "next-auth/react";
import { GetPrivateUser } from "@/types/types";
import { trpc } from "@/app/_trpc/client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserAvatar } from "@/components/user-avatar";
import { Button } from "@/components/ui/button";

interface NavigationDropdownProps {
  initialData: GetPrivateUser;
  initialDataImage: {
    image: string | null;
    email: string | null;
  };
  className?: string;
}

export const NavigationDropdown = ({
  initialData,
  initialDataImage,
  className,
}: NavigationDropdownProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { data: user } = trpc.user.private.get.useQuery(undefined, {
    initialData,
    staleTime: Infinity,
  });

  const { data } = trpc.user.private.getImage.useQuery(undefined, {
    initialData: initialDataImage,
    staleTime: Infinity,
  });

  if (!isMounted) {
    return (
      <Button
        variant="secondary"
        className="h-12 w-12 rounded-full p-0 hover:bg-neutral-200 dark:hover:bg-neutral-700"
      >
        <Menu className="h-5 w-5" />
      </Button>
    );
  }
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className={className} asChild>
          <Button
            variant="secondary"
            className="h-12 w-12 rounded-full p-0 hover:bg-neutral-200 dark:hover:bg-neutral-700"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          className="w-[260px] bg-secondary shadow-sm"
          sideOffset={8}
        >
          <DropdownMenuLabel className="flex items-center gap-2">
            <UserAvatar
              imageUrl={data.image}
              email={user.email!}
              className="h-8 w-8"
            />

            <h1 className="truncate">{user.name ? user.name : "Anonymous"}</h1>
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-primary/5" />

          <DropdownMenuItem
            className=" focus:bg-primary/10"
            onSelect={() => router.push("/dashboard")}
          >
            <Settings2 className="mr-2 h-4 w-4" />
            Dashboard
          </DropdownMenuItem>
          <DropdownMenuItem
            className=" focus:bg-primary/10"
            onSelect={() => router.push(`/${user.slug}`)}
          >
            <LayoutGrid className="mr-2 h-4 w-4" />
            Habits
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer focus:bg-destructive"
            onSelect={() => signOut({ callbackUrl: "/login" })}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Link href={`/${user.slug}`} passHref>
        <Button
          className="h-12 rounded-full px-4 hover:bg-neutral-200 dark:hover:bg-neutral-700"
          variant="secondary"
        >
          <LayoutGrid className="mr-2 h-4 w-4" />
          Habits
        </Button>
      </Link>
    </>
  );
};
