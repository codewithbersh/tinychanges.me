import Link from "next/link";

import { Icons } from "@/components/ui/icons";
import { WaitlistForm } from "./_components/waitlist-form";
import { Logo } from "./_components/logo";
import { notFound } from "next/navigation";

const WaitlistPage = () => {
  return notFound();
  return (
    <div className="grid h-full w-full place-items-center p-4">
      <div className="mx-auto flex max-w-md flex-col gap-12 text-center">
        <div className="flex flex-col gap-4">
          <div className="mx-auto w-fit">
            <Link href="/login">
              <Logo />
            </Link>
          </div>
          <div className=" mt-4 text-3xl font-semibold leading-[1.2] sm:text-[40px]">
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
            className="animate-fade-up text-lg text-muted-foreground opacity-0"
            style={{ animationDelay: "0.40s", animationFillMode: "forwards" }}
          >
            – James Clear
          </span>
        </div>

        <div className="flex flex-col gap-4 ">
          <p
            className="animate-fade-up opacity-0 sm:text-lg"
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
          className="mx-auto flex w-fit animate-fade-up flex-col items-center gap-1 text-center text-sm leading-none opacity-0"
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
