"use client";

import Link from "next/link";
import { trpc } from "@/app/_trpc/client";
import { notFound } from "next/navigation";
import { Calendar } from "lucide-react";
import { format } from "date-fns";
import { useSession } from "next-auth/react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Icons } from "@/components/ui/icons";

interface ProfileProps {
  slug: string;
}

export const Profile = ({ slug }: ProfileProps) => {
  const { data: session } = useSession();

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

  const isOwner = session?.user.slug === user.slug;

  return (
    <div className="flex flex-col gap-4">
      {isOwner ? (
        <Link className="w-fit space-y-4" href={`/${user.slug}/profile`}>
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
        </Link>
      ) : (
        <div className="w-fit space-y-4">
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
        </div>
      )}

      <div className="flex gap-6">
        <div className="flex items-center gap-2">
          <Icons.contributions />
          <div className="min-w-[100px] text-xs leading-none text-muted-foreground">
            {totalContributions} contribution{totalContributions != 1 && "s"}
          </div>
        </div>
        <div className="flex items-center gap-2 truncate">
          <Calendar className="h-4 w-4  shrink-0 text-muted-foreground" />
          <div className="truncate text-xs leading-none text-muted-foreground">
            Joined {format(user.joinedAt, "MMM dd, yyyy")}
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
      <div className="flex gap-6">
        <Skeleton className="h-4 w-[124px]" />
        <Skeleton className="h-4 w-28" />
      </div>
    </div>
  );
};
