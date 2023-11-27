import { getCurrentUser } from "@/lib/get-current-user";

import { Navbar } from "./navbar";

export type Route = {
  label: string;
  href: string;
};

export const Header = async () => {
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
    <div className="p-4 md:p-8">
      <Navbar routes={routes} isAuthenticated={!!user} />
    </div>
  );
};
