"use client";

import { trpc } from "@/app/_trpc/client";
import { notFound } from "next/navigation";
import { Calendar } from "lucide-react";
import { format } from "date-fns";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Icons } from "@/components/ui/icons";

interface ProfileProps {
  slug: string;
}

export const Profile = ({ slug }: ProfileProps) => {
  const { data: user, isLoading } = trpc.user.getUserBySlug.useQuery(
    { slug },
    {
      staleTime: Infinity,
    },
  );

  const { data: totalContributions } =
    trpc.user.getUserTotalContributions.useQuery(
      {
        slug,
      },
      {
        staleTime: Infinity,
      },
    );

  if (isLoading) {
    return <Profile.Skeleton />;
  }

  if (!user) {
    return notFound();
  }

  return (
    <div className="flex flex-col gap-4">
      <Avatar>
        <AvatarImage src={user.image ?? ""} />
        <AvatarFallback>{user.email![0]}</AvatarFallback>
      </Avatar>

      <div className="flex h-5 items-center gap-1.5 leading-none ">
        <h1 className="fond-medium">{user.name}</h1>
        {user.twitterHandle && (
          <span className="truncate text-sm text-muted-foreground">{`@${user.twitterHandle}`}</span>
        )}
      </div>

      <div className="flex gap-6">
        <div className="flex items-center gap-2">
          <Icons.contributions />
          <div className="min-w-[100px] text-xs leading-none text-muted-foreground">
            {totalContributions} contribution{totalContributions != 1 && "s"}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4  text-muted-foreground" />
          <div className="text-xs leading-none text-muted-foreground">
            {format(user.joinedAt, "MMM dd, yyyy")}
          </div>
        </div>
      </div>
    </div>
  );
};

Profile.Skeleton = function SkeletonProfile() {
  return (
    <div className="flex flex-col gap-4">
      <Skeleton className="h-10 w-10 rounded-full" />
      <div className="flex gap-1.5">
        <Skeleton className="h-5 w-12" />
        <Skeleton className="h-5 w-12" />
      </div>
      <div className="flex gap-2">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-4 w-28" />
      </div>
    </div>
  );
};
