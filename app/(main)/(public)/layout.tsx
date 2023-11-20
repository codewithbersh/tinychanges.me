import { PropsWithChildren } from "react";
import { getCurrentUser } from "@/lib/get-current-user";
import { Settings2 } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

const PublicLayout = async ({ children }: PropsWithChildren) => {
  const user = await getCurrentUser();

  return (
    <div>
      {children}

      <div className="fixed bottom-4 left-4 flex items-center gap-4 md:bottom-8 md:left-8">
        {user && (
          <Link href="/dashboard">
            <Button className="h-12 rounded-full px-4" variant="secondary">
              <Settings2 className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default PublicLayout;
