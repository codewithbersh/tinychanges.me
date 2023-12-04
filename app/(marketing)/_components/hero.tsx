import { getCurrentUser } from "@/lib/get-current-user";

import { LoginAction } from "./login-action";

export const Hero = async () => {
  const user = await getCurrentUser();

  return (
    <div className="flex flex-col gap-2 text-center">
      <h1
        className="animate-fade-up text-2xl font-bold opacity-0"
        style={{ animationFillMode: "forwards", animationDelay: "0.15s" }}
      >
        Tiny Changes
      </h1>
      <p
        className="animate-fade-up opacity-0"
        style={{ animationFillMode: "forwards", animationDelay: "0.30s" }}
      >
        A simplified habit tracker.
      </p>
      <LoginAction userId={user?.id} />
    </div>
  );
};
