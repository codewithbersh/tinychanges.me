import { getCurrentUser } from "@/lib/get-current-user";
import { redirect } from "next/navigation";

import { Icons } from "@/components/ui/icons";
import { UserAuthForm } from "./_components/user-auth-form";

const LoginPage = async () => {
  const user = await getCurrentUser();

  if (user) {
    return redirect(`/${user.slug}`);
  }
  return (
    <div className="p-4">
      <div className="flex w-full flex-col items-center gap-4">
        <div
          className="grid animate-fade-up place-items-center opacity-0"
          style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
        >
          <Icons.logo className="h-8 w-8" />
        </div>
        <h1
          className="w-full animate-fade-up text-center text-xl font-medium opacity-0"
          style={{ animationDelay: "0.30s", animationFillMode: "forwards" }}
        >
          Tiny Changes
        </h1>
      </div>
      <div className="mt-8">
        <UserAuthForm />
      </div>
    </div>
  );
};

export default LoginPage;
