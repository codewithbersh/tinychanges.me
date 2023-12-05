"use client";

import { trpc } from "@/app/_trpc/client";
import { useSession } from "next-auth/react";
import { notFound, useParams } from "next/navigation";
import Link from "next/link";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

export const CreateHabitLink = () => {
  const { data: session } = useSession();
  const params = useParams();
  const slug = params["slug"];

  if (!session?.user && session?.user.slug !== slug) {
    return notFound();
  }

  const { data: user } = trpc.user.getUserById.useQuery(
    {
      id: session.user.id,
    },
    {
      staleTime: Infinity,
    },
  );

  return (
    <Button asChild size="icon" className="ml-auto">
      <Link href={`/${user?.user?.slug}/habits/new`}>
        <Plus className="h-4 w-4" />
      </Link>
    </Button>
  );
};
