import { serverTrpc } from "@/app/_trpc/server";

import { Header } from "../_components/header";
import { FormProfile } from "./_components/form-profile";
import { FormImage } from "./_components/form-image";

const ProfilePage = async () => {
  const user = await serverTrpc.user.private.get();
  const data = await serverTrpc.user.private.getImage();

  return (
    <div className="flex flex-col gap-12">
      <Header route="profile" label="Profile" />
      <div className="space-y-8">
        <FormImage initialData={data} />
        <FormProfile initialData={user} />
      </div>
    </div>
  );
};

export default ProfilePage;
