import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { PropsWithChildren } from "react";

const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="relative grid h-full w-full place-items-center">
      <Button
        asChild
        variant="ghost"
        className="absolute left-4 top-4 h-auto px-4 py-2 md:left-8 md:top-8"
      >
        <Link href="/">
          <ChevronLeft className="mr-2 h-4 w-4" /> Back
        </Link>
      </Button>
      <div>{children}</div>
    </div>
  );
};

export default AuthLayout;
