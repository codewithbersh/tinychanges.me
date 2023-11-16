import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

interface TypeProps {
  type: {
    label: string;
    url: string;
  };
}

export const Type = ({ type }: TypeProps) => {
  return (
    <Link href={type.url} passHref>
      <Button variant="link" className="h-[35px]">
        {type.label}
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </Link>
  );
};
