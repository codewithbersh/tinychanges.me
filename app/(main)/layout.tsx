import { PropsWithChildren } from "react";
import { getCurrentUser } from "@/lib/get-current-user";
import { notFound, redirect } from "next/navigation";
import { Route } from "@/types/types";
import { LayoutGrid, Settings } from "lucide-react";

import { DesktopNavigation } from "./_components/desktop-navigation";
import { MobileNavigation } from "./_components/mobile-navigation";

const MainLayout = async ({ children }: PropsWithChildren) => {
  if (true) {
    notFound();
  }

  return null;
  // const user = await getCurrentUser();

  // if (!user) {
  //   return redirect("/login");
  // }

  // const routes: Route[] = [
  //   {
  //     label: "Habits",
  //     href: `/${user.slug}`,
  //     icon: LayoutGrid,
  //   },
  //   {
  //     label: "Settings",
  //     href: "/settings",
  //     icon: Settings,
  //   },
  // ];

  // return (
  //   <div className="relative h-full w-full">
  //     <div className="left-0 top-0 hidden h-screen w-[60px] border-r bg-background sm:fixed sm:left-0 sm:top-0 sm:block">
  //       <DesktopNavigation routes={routes} user={user} />
  //     </div>
  //     <div>
  //       <MobileNavigation routes={routes} />
  //     </div>
  //     <div className="mx-auto h-full w-full max-w-sm px-4 py-8 sm:px-0 sm:py-16">
  //       {children}
  //     </div>
  //   </div>
  // );
};

export default MainLayout;
