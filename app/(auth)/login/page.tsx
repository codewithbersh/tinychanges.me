import { getCurrentUser } from "@/lib/get-current-user";
import { redirect } from "next/navigation";

import { UserAuthForm } from "./_components/user-auth-form";

const LoginPage = async () => {
  const user = await getCurrentUser();
  if (user) {
    return redirect(`/${user.slug}`);
  }
  return (
    <div className="p-4">
      <div>
        <h1 className="text-center text-xl font-medium">Welcome</h1>
      </div>
      <div className="mt-4">
        <UserAuthForm />
      </div>
    </div>
  );
};

export default LoginPage;
