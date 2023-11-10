import { Loader } from "lucide-react";

export const PageLoader = () => {
  return (
    <div className="my-auto grid h-full w-full place-items-center">
      <Loader className="h-6 w-6 animate-spin" />
    </div>
  );
};
