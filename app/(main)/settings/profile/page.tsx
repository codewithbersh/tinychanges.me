import { serverTrpc } from "@/app/_trpc/server";

import { Header } from "@/app/(main)/settings/_components/header";
import { FormProfile } from "./_components/form-profile";

const ProfilePage = async () => {
  const user = await serverTrpc.user.private.get();

  return (
    <div className="flex flex-col gap-12">
      <Header route="Profile" />
      <FormProfile initialData={user} />
    </div>
  );
};

export default ProfilePage;
