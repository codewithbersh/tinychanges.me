import Link from "next/link";

import { Icons } from "@/components/ui/icons";
import { WaitlistForm } from "./_components/waitlist-form";

const WaitlistPage = () => {
  return (
    <div className="h-full w-full grid place-items-center">
      <div className="max-w-md text-center mx-auto flex flex-col gap-12">
        <div className="flex flex-col gap-4">
          <h1 className=" text-3xl sm:text-[40px] font-semibold leading-[1.2]">
            Tiny Changes, <br /> Remarkable Results.
          </h1>
          <span className="text-muted-foreground text-lg">– James Clear</span>
        </div>

        <div className="flex flex-col gap-4">
          <p className="sm:text-lg">
            Get notified on launch day for{" "}
            <span className="font-bold">tinychanges</span> – a simplified habit
            tracker.
          </p>

          <WaitlistForm />
        </div>

        <Link
          href="https://twitter.com/codewithbersh"
          className="flex items-center flex-col gap-1 text-center text-sm leading-none"
          target="_blank"
        >
          <Icons.twitter />
          <span>@codewithbersh</span>
          <span className="text-muted-foreground">#buildinpublic</span>
        </Link>
      </div>
    </div>
  );
};

export default WaitlistPage;
