"use client";

import Link from "next/link";
import { Settings } from "lucide-react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export const HabitsLink = () => {
  const { data: session } = useSession();
  const params = useParams();

  if (!session?.user && params["slug"] !== session?.user.slug) {
    return;
  }

  return (
    <Button variant="secondary" size="icon" className="ml-auto md:ml-0" asChild>
      <Link href={`/${session.user.slug}/habits`}>
        <Settings className="h-4 w-4 text-muted-foreground" />
      </Link>
    </Button>
  );
};

HabitsLink.Skeleton = function SkeletonHabitsLink() {
  return <Skeleton className="ml-auto h-8 w-8 rounded-md md:ml-0" />;
};
