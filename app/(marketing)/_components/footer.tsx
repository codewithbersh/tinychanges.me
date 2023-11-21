import Link from "next/link";

import { Icons } from "@/components/ui/icons";

export const Footer = () => {
  return (
    <Link
      href="https://x.com/codewithbersh"
      target="_blank"
      className="flex flex-col items-center gap-0.5 text-center text-sm"
    >
      <Icons.twitter />
      <div className="mt-1.5">@codewithbersh</div>
      <div className="text-muted-foreground">#buildinpublic</div>
    </Link>
  );
};
