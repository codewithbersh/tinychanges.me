import { getCurrentUser } from "@/lib/get-current-user";
import { redirect } from "next/navigation";
import { Logo } from "@/app/(marketing)/waitlist/_components/logo";

import { UserAuthForm } from "./_components/user-auth-form";

const LoginPage = async () => {
  const user = await getCurrentUser();

  // if (user) {
  //   return redirect(`/${user.slug}`);
  // }

  if (user) {
    return redirect("/dashboard");
  }
  return (
    <div className="p-4">
      {/* <div className="fixed left-0 top-0  flex h-6 w-screen items-center justify-center bg-red-100 text-center text-sm leading-none text-red-500 ">
        <AlertTriangle className="mr-2 h-4 w-4" />
        <h1>Warning: Admin users only.</h1>
      </div> */}
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
