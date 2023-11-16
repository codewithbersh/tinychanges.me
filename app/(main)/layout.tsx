import { PropsWithChildren } from "react";

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="mx-auto min-h-full w-full max-w-md px-4 py-8 sm:px-0 sm:py-16">
      {children}
    </div>
  );
};

export default MainLayout;
