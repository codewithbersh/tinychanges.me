import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

interface HeaderProps {
  route?: string;
  label?: string;
}

export const Header = ({ route, label }: HeaderProps) => {
  return (
    <div className="flex -translate-x-3 items-center gap-1">
      <Link href="/dashboard" className={cn(route && "text-muted-foreground")}>
        <Button variant="ghost">Dashboard</Button>
      </Link>
      {route && label && (
        <div className="flex items-center gap-1">
          <ChevronRight className="h-4 w-4" />
          <Link href={`/dashboard/${route}`}>
            <Button variant="ghost">{label}</Button>
          </Link>
        </div>
      )}
    </div>
  );
};
