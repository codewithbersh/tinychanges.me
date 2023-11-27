import { getCurrentUser } from "@/lib/get-current-user";

import { Navbar } from "./navbar";
import { Profile } from "./profile";

export type Route = {
  label: string;
  href: string;
};

interface HeaderProps {
  slug: string;
}

export const Header = async ({ slug }: HeaderProps) => {
  const user = await getCurrentUser();

  const routes = [
    {
      label: "Home",
      href: `/${user?.slug}`,
    },
    {
      label: "Profile",
      href: `/${user?.slug}/profile`,
    },
    {
      label: "Create Habit",
      href: `/${user?.slug}/habits/new`,
    },
  ];

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6">
      <Navbar routes={routes} isAuthenticated={!!user} />
      <Profile slug={slug} />
    </div>
  );
};
