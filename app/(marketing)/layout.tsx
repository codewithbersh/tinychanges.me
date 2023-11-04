import { PropsWithChildren } from "react";

const MarketingLayout = ({ children }: PropsWithChildren) => {
  return <div className="h-full">{children}</div>;
};

export default MarketingLayout;
