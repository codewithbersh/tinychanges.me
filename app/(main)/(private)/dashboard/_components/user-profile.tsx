"use client";

import { trpc } from "@/app/_trpc/client";
import { GetPrivateUser } from "@/types/types";

import { UserAvatar } from "@/components/user-avatar";

interface UserProfileProps {
  initialData: GetPrivateUser;
}

export const UserProfile = ({ initialData }: UserProfileProps) => {
  const { data: user } = trpc.user.private.get.useQuery(undefined, {
    initialData,
    staleTime: Infinity,
  });

  return (
    <>
      <UserAvatar
        imageUrl={user.image}
        email={user.email!}
        className="h-16 w-16 cursor-default text-4xl"
      />
      <div className="flex flex-col truncate">
        <h2 className="truncate">
          {user.name ?? <span className="text-muted-foreground">No name</span>}
        </h2>
        <p className="truncate text-muted-foreground">
          {!user.bio || user.bio.length === 0 ? "No bio." : user.bio}
        </p>
      </div>
    </>
  );
};
