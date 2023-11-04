import { PropsWithChildren } from "react";

const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="h-full w-full grid place-items-center">{children}</div>
  );
};

export default AuthLayout;
