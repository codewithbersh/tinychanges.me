import { serverTrpc } from "@/app/_trpc/server";

import { FormProfile } from "./_components/form-profile";

const ProfilePage = async () => {
  const user = await serverTrpc.user.private.get();

  return (
    <div className="flex flex-col gap-12">
      <h1 className="text-lg font-semibold text-muted-foreground">
        Settings / <span className="text-primary">Profile</span>
      </h1>
      <FormProfile initialData={user} />
    </div>
  );
};

export default ProfilePage;
