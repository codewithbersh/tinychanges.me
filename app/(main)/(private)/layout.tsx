import { PropsWithChildren } from "react";
import { LayoutGrid } from "lucide-react";
import Link from "next/link";
import { serverTrpc } from "@/app/_trpc/server";

import { Button } from "@/components/ui/button";
import { NavigationDropdown } from "./_components/navigation-dropdown";

const PrivateLayout = async ({ children }: PropsWithChildren) => {
  const user = await serverTrpc.user.private.get();
  return (
    <div>
      <div>{children}</div>
      <div className="fixed bottom-8 left-8 flex items-center gap-4">
        <NavigationDropdown initialData={user} />
        <Link href={`/${user.slug}`} passHref>
          <Button className="h-12 rounded-full px-4" variant="secondary">
            <LayoutGrid className="mr-2 h-4 w-4" />
            Habits
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default PrivateLayout;
