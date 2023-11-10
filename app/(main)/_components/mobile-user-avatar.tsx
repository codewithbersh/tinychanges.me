"use client";

import { trpc } from "@/app/_trpc/client";
import { GetPrivateUser } from "@/types/types";

import { UserAvatar } from "@/components/user-avatar";

interface UserAvatarClientProps {
  initialData: GetPrivateUser;
}

export const MobileUserAvatar = ({ initialData }: UserAvatarClientProps) => {
  const { data: user } = trpc.user.private.get.useQuery(undefined, {
    initialData,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
  return (
    <UserAvatar
      imageUrl={user.image}
      email={user.email!}
      className="h-12 w-12 text-2xl"
    />
  );
};
