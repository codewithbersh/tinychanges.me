"use client";

import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

import { Navbar } from "./navbar";
import { Profile } from "./profile";

export type Route = {
  label: string;
  href: string;
  isActive: boolean;
};

interface HeaderProps {
  slug: string;
}

export const Header = ({ slug }: HeaderProps) => {
  const { data: session } = useSession();
  const pathname = usePathname();

  const routes = [
    {
      label: "Home",
      href: `/${session?.user.slug}`,
      isActive: pathname === `/${session?.user.slug}`,
    },
    {
      label: "Habits",
      href: `/${session?.user.slug}/habits`,
      isActive: pathname === `/${session?.user.slug}/habits`,
    },
    {
      label: "Profile",
      href: `/${session?.user.slug}/profile`,
      isActive: pathname === `/${session?.user.slug}/profile`,
    },
  ];

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6">
      <Navbar routes={routes} isAuthenticated={!!session?.user} />
      <Profile slug={slug} />
    </div>
  );
};
