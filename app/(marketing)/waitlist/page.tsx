import Link from "next/link";

import { Icons } from "@/components/ui/icons";
import { WaitlistForm } from "./_components/waitlist-form";

const WaitlistPage = () => {
  return (
    <div className="h-full w-full grid place-items-center p-4">
      <div className="max-w-md text-center mx-auto flex flex-col gap-12">
        <div className="flex flex-col gap-4">
          <div className=" text-3xl sm:text-[40px] font-semibold leading-[1.2]">
            <h1
              className=" animate-fade-up opacity-0"
              style={{ animationDelay: "0.05s", animationFillMode: "forwards" }}
            >
              Tiny Changes,
            </h1>
            <h1
              className=" animate-fade-up opacity-0"
              style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
            >
              Remarkable Results.
            </h1>
          </div>
          <span
            className="text-muted-foreground text-lg animate-fade-up opacity-0"
            style={{ animationDelay: "0.40s", animationFillMode: "forwards" }}
          >
            – James Clear
          </span>
        </div>

        <div className="flex flex-col gap-4 ">
          <p
            className="sm:text-lg animate-fade-up opacity-0"
            style={{ animationDelay: "0.55s", animationFillMode: "forwards" }}
          >
            Get notified on launch day for{" "}
            <span className="font-bold">tinychanges</span> – a simplified habit
            tracker.
          </p>

          <WaitlistForm />
        </div>

        <Link
          href="https://twitter.com/codewithbersh"
          className="flex items-center flex-col gap-1 text-center text-sm leading-none animate-fade-up opacity-0"
          target="_blank"
          style={{ animationDelay: "1s", animationFillMode: "forwards" }}
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
