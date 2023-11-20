import { serverTrpc } from "@/app/_trpc/server";
import { PropsWithChildren } from "react";

import { NavigationDropdown } from "./_components/navigation-dropdown";

const PrivateLayout = async ({ children }: PropsWithChildren) => {
  const user = await serverTrpc.user.private.get();
  const initialDataImage = await serverTrpc.user.private.getImage();
  return (
    <div>
      <div>{children}</div>
      <div className="fixed bottom-4 left-4 flex items-center gap-4 md:bottom-8 md:left-8">
        <NavigationDropdown
          initialData={user}
          initialDataImage={initialDataImage}
        />
      </div>
    </div>
  );
};

export default PrivateLayout;
