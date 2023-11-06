import { PropsWithChildren } from "react";
import { getCurrentUser } from "@/lib/get-current-user";
import { redirect } from "next/navigation";
import { Route } from "@/types/types";
import { LayoutGrid, Settings } from "lucide-react";

import { DesktopNavigation } from "./_components/desktop-navigation";
import { MobileNavigation } from "./_components/mobile-navigation";

const MainLayout = async ({ children }: PropsWithChildren) => {
  const user = await getCurrentUser();

  if (!user) {
    return redirect("/login");
  }

  const routes: Route[] = [
    {
      label: "Habits",
      href: `/${user.slug}`,
      icon: LayoutGrid,
    },
    {
      label: "Settings",
      href: "/settings",
      icon: Settings,
    },
  ];

  return (
    <div className="relative h-full w-full">
      <div className="left-0 top-0 hidden h-screen w-[60px] border-r bg-background sm:fixed sm:left-0 sm:top-0 sm:block">
        <DesktopNavigation routes={routes} />
      </div>
      <div className="fixed bottom-6 left-6 h-12 w-12 cursor-pointer rounded-full border shadow-md sm:hidden">
        <MobileNavigation routes={routes} />
      </div>
      <div className="mx-auto h-full w-full max-w-sm px-4 sm:px-0">
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
