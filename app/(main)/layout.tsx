import { PropsWithChildren } from "react";
import { Route } from "@/types/types";
import { LayoutGrid, Settings } from "lucide-react";
import { serverTrpc } from "@/app/_trpc/server";

import { DesktopNavigation } from "./_components/desktop-navigation";
import { MobileNavigation } from "./_components/mobile-navigation";

const MainLayout = async ({ children }: PropsWithChildren) => {
  const user = await serverTrpc.user.private.get();

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
        <DesktopNavigation routes={routes} initialData={user} />
      </div>
      <div>
        <MobileNavigation routes={routes} initialData={user} />
      </div>
      <div className="mx-auto h-full w-full max-w-sm px-4 py-8 sm:px-0 sm:py-16">
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
