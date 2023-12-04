"use client";

import Link from "next/link";
import { trpc } from "@/app/_trpc/client";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export const LoginAction = ({ userId }: { userId: string | undefined }) => {
  const { data, isLoading } = trpc.user.getUserById.useQuery({ id: userId });

  if (isLoading) {
    return <LoginAction.Skeleton />;
  }

  return (
    <Button className="mx-auto mt-4 w-fit" asChild>
      {data?.user ? (
        <Link href={`/${data.user.slug}`}>
          View Habits <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      ) : (
        <Link href="/login">Join now – it's free</Link>
      )}
    </Button>
  );
};

LoginAction.Skeleton = function SkeletonLoginAction() {
  return <Skeleton className="mx-auto mt-4 h-8 w-32  rounded-md " />;
};
