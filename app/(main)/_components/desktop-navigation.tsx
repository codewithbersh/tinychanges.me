import Link from "next/link";
import { Route } from "@/types/types";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DesktopNavigationProps {
  routes: Route[];
  imageUrl: string | null | undefined;
  emailInitials: string;
}

export const DesktopNavigation = ({
  routes,
  imageUrl,
  emailInitials,
}: DesktopNavigationProps) => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4">
      {routes.map(({ href, icon: Icon }) => (
        <Link
          key={href}
          className="group cursor-pointer rounded-md p-2 transition-colors hover:bg-accent"
          href={href}
        >
          <Icon className="stroke-icon h-5 w-5 text-primary transition-all duration-300 group-hover:rotate-45" />
        </Link>
      ))}

      <Popover>
        <PopoverTrigger asChild>
          <Avatar className="absolute bottom-4 h-8 w-8 cursor-pointer">
            {imageUrl ? (
              <>
                <AvatarImage src={imageUrl} />
              </>
            ) : (
              <AvatarFallback className="font-medium">
                {emailInitials.toUpperCase()}
              </AvatarFallback>
            )}
          </Avatar>
        </PopoverTrigger>
        <PopoverContent align="start" className="shadow">
          Hello
        </PopoverContent>
      </Popover>
    </div>
  );
};
