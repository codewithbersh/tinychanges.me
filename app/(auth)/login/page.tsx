import { getCurrentUser } from "@/lib/get-current-user";
import { redirect } from "next/navigation";
import { Logo } from "@/app/(marketing)/waitlist/_components/logo";

import { UserAuthForm } from "./_components/user-auth-form";

const LoginPage = async () => {
  const user = await getCurrentUser();

  if (user) {
    return redirect(`/${user.slug}`);
  }
  return (
    <div className="p-4">
      <div className="flex w-full flex-col items-center gap-4">
        <div className="grid place-items-center">
          <Logo />
        </div>
        <h1
          className="w-full animate-fade-up text-center text-xl font-medium opacity-0"
          style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
        >
          Welcome
        </h1>
      </div>
      <div
        className="mt-8 animate-fade-up opacity-0"
        style={{ animationDelay: "1s", animationFillMode: "forwards" }}
      >
        <UserAuthForm />
      </div>
    </div>
  );
};

export default LoginPage;
