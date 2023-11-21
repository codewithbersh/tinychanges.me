import { getCurrentUser } from "@/lib/get-current-user";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Demo } from "./_components/demo";
import { Quote } from "./_components/quote";

const MarketingPage = async () => {
  const user = await getCurrentUser();
  return (
    <div className="space-y-24">
      <div className="flex flex-col gap-2 text-center">
        <h1 className="text-2xl font-bold">Tiny Changes</h1>
        <p className="lead">A simplified habit tracker.</p>
        <Button className="mx-auto mt-4 h-[40px] px-4" asChild>
          {user ? (
            <Link href="/dashboard">
              Dashboard <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          ) : (
            <Link href="/login">Join – it&apos;s free</Link>
          )}
        </Button>
      </div>

      <Demo />

      <Quote />
    </div>
  );
};

export default MarketingPage;
