import Link from "next/link";

import { Icons } from "./ui/icons";

export const Logo = () => {
  return (
    <Link href="/" className="flex gap-2">
      <Icons.logo className="h-5 w-5" />
      <h1 className="text-sm font-bold uppercase text-yellow-300">
        Tiny Changes
      </h1>
    </Link>
  );
};
