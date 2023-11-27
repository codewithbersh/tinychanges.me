"use client";

import { trpc } from "@/app/_trpc/client";
import { notFound } from "next/navigation";
import { Calendar } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Icons } from "@/components/ui/icons";

interface ProfileProps {
  slug: string;
}

export const Profile = ({ slug }: ProfileProps) => {
  const { data: user, isLoading } = trpc.user.getUserBySlug.useQuery({ slug });

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
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      <div className="flex items-center gap-1.5 leading-none ">
        <h1 className="fond-medium">{user.name}</h1>
        <span className="text-sm text-muted-foreground">@codewithbersh</span>
      </div>

      <div className="flex gap-6">
        <div className="flex items-center gap-2">
          <Icons.contributions />
          <div className="text-xs leading-none text-muted-foreground">
            256 contributions
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4  text-muted-foreground" />
          <div className="text-xs leading-none text-muted-foreground">
            Joined Jan 24, 2023
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
