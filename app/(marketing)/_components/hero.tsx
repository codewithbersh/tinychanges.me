import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getCurrentUser } from "@/lib/get-current-user";

import { Button } from "@/components/ui/button";

export const Hero = async () => {
  const user = await getCurrentUser();
  return (
    <div className="flex flex-col gap-2 text-center">
      <h1
        className="animate-fade-up text-2xl font-bold opacity-0"
        style={{ animationFillMode: "forwards", animationDelay: "0.15s" }}
      >
        Tiny Changes
      </h1>
      <p
        className="animate-fade-up opacity-0"
        style={{ animationFillMode: "forwards", animationDelay: "0.30s" }}
      >
        A simplified habit tracker.
      </p>
      <Button
        className="mx-auto mt-4 h-[40px] animate-fade-up px-4 opacity-0"
        asChild
        style={{ animationFillMode: "forwards", animationDelay: "0.45s" }}
      >
        {user ? (
          <Link href={`/${user.slug}`}>
            View Habits <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        ) : (
          <Link href="/login">Join – it&apos;s free</Link>
        )}
      </Button>
    </div>
  );
};
