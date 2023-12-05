"use client";

import Link from "next/link";
import { Settings } from "lucide-react";
import { useParams } from "next/navigation";
import { trpc } from "@/app/_trpc/client";
import { useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";

export const HabitsLink = () => {
  const { data: session } = useSession();
  const params = useParams();

  if (!session?.user && params["slug"] !== session?.user.slug) {
    return;
  }

  const { data: user } = trpc.user.getAuthUser.useQuery(undefined, {
    staleTime: Infinity,
  });

  if (!user) {
    return;
  }

  return (
    <Button variant="secondary" size="icon" className="ml-auto md:ml-0" asChild>
      <Link href={`/${user.slug}/habits`}>
        <Settings className="h-4 w-4 text-muted-foreground" />
      </Link>
    </Button>
  );
};
