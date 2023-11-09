import { getCurrentUser } from "@/lib/get-current-user";
import { redirect } from "next/navigation";

import { UserAuthForm } from "./_components/user-auth-form";
import { AlertTriangle } from "lucide-react";

const LoginPage = async () => {
  const user = await getCurrentUser();

  // if (user) {
  //   return redirect(`/${user.slug}`);
  // }

  if (user) {
    return redirect("/admin");
  }
  return (
    <div className="p-4">
      <div className="fixed left-0 top-0  flex h-6 w-screen items-center justify-center bg-red-100 text-center text-sm leading-none text-red-500 ">
        <AlertTriangle className="mr-2 h-4 w-4" />
        <h1>Warning: Admin users only.</h1>
      </div>
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
