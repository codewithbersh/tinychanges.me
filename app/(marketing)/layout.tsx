import { PropsWithChildren } from "react";
import { Footer } from "./_components/footer";

const MarketingLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex min-h-full flex-col">
      <div className="mx-auto max-w-sm px-4 py-12 sm:px-0 md:py-24">
        {children}
      </div>
      <div className="mx-auto mt-auto w-fit py-8">
        <Footer />
      </div>
    </div>
  );
};

export default MarketingLayout;
