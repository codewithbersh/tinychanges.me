import { Bricolage_Grotesque } from "next/font/google";
import { marketingConfig } from "@/config/marketing";
import { cn } from "@/lib/utils";
import { getCurrentUser } from "@/lib/get-current-user";
import Link from "next/link";
import { ArrowRight, QuoteIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

const font = Bricolage_Grotesque({
  weight: ["400"],
  subsets: ["latin"],
});

export const Quote = async () => {
  const user = await getCurrentUser();
  const quotes = marketingConfig.quotes;
  const quote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <div
      className="flex animate-fade-up flex-col gap-4 opacity-0"
      style={{ animationFillMode: "forwards", animationDelay: "1.05s" }}
    >
      <div className="flex gap-2">
        <QuoteIcon className="h-6 w-6 text-muted-foreground" />
        <p className={cn(font.className, "text-xl", "text-center")}>
          {quote.quote}
        </p>
        <QuoteIcon className="h-6 w-6 text-muted-foreground" />
      </div>
      <p
        className={cn(
          font.className,
          "text-center text-xl text-muted-foreground",
        )}
      >
        – {quote.author}
      </p>
      <Button className="mx-auto mt-4 h-[40px] px-4" asChild>
        {user ? (
          <Link href={`/${user.slug}`}>
            View Habits <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        ) : (
          <Link href="/login">
            Start Tracking <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        )}
      </Button>
    </div>
  );
};
