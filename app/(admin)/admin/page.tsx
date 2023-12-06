import Link from "next/link";
import { notFound } from "next/navigation";
import { getCurrentUser } from "@/lib/get-current-user";

import { Button } from "@/components/ui/button";
import { UsersList } from "./_components/users-list";

const AdminPage = async () => {
  const user = await getCurrentUser();
  if (!user || user.email !== "hello@brucesalcedo.com") {
    return notFound();
  }
  return (
    <div className="mx-auto max-w-md py-24">
      <div className="flex gap-4">
        <Button asChild variant="secondary">
          <Link className="" href={`/${user.slug}`}>
            Home
          </Link>
        </Button>
      </div>
      <UsersList />
    </div>
  );
};

export default AdminPage;
