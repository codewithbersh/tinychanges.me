import { PropsWithChildren } from "react";

import { Footer } from "./_components/footer";

const MarketingLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex min-h-full flex-col">
      <svg
        className=" pointer-events-none fixed inset-0 h-full w-full stroke-neutral-200/75 opacity-50 [mask-image:radial-gradient(100%_100%_at_top_center,white,transparent)] dark:stroke-neutral-800/75"
        aria-hidden
      >
        <defs>
          <pattern
            id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
            width={100}
            height={100}
            x="50%"
            y={-1}
            patternUnits="userSpaceOnUse"
          >
            <path d="M50 100V.5M.5 .5H200" fill="none" />
          </pattern>
        </defs>
        <rect
          width="100%"
          height="100%"
          strokeWidth={0}
          fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)"
        />
      </svg>
      <div className="z-50 mx-auto max-w-sm px-4 py-12 sm:px-0 md:py-24">
        {children}
      </div>
      <div className="mx-auto mt-auto w-fit py-8">
        <Footer />
      </div>
    </div>
  );
};

export default MarketingLayout;
