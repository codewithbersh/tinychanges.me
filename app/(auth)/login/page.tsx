import { getCurrentUser } from "@/lib/get-current-user";
import { redirect } from "next/navigation";

import { UserAuthForm } from "./_components/user-auth-form";

const LoginPage = async () => {
  const user = await getCurrentUser();
  if (user) {
    return redirect(`/${user.link}`);
  }
  return (
    <div className="p-4">
      <div>
        <h1 className="text-xl font-medium text-center">Welcome</h1>
      </div>
      <div className="mt-4">
        <UserAuthForm />
      </div>
    </div>
  );
};

export default LoginPage;
