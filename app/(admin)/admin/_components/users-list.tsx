"use client";

import Link from "next/link";
import { trpc } from "@/app/_trpc/client";

export const UsersList = () => {
  const { data: users } = trpc.admin.get.users.useQuery();

  return (
    <ol className="flex flex-col gap-4 py-8">
      {users?.map((user, index) => (
        <li key={user.id} className="flex items-center justify-between gap-4">
          <Link href={`/${user.slug}`} className="truncate hover:underline">
            {index + 1}. {user.email}
          </Link>
          <div className="text-sm text-muted-foreground">
            {user.joinedAt.toDateString()}
          </div>
        </li>
      ))}
    </ol>
  );
};
