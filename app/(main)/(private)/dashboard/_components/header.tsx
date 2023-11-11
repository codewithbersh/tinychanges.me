import Link from "next/link";

interface HeaderProps {
  route: string;
}

export const Header = ({ route }: HeaderProps) => {
  return (
    <h1 className="text-lg font-semibold text-muted-foreground">
      <Link href="/dashboard" className="underline-offset-2 hover:underline">
        Dashboard
      </Link>{" "}
      / <span className="text-primary">{route}</span>
    </h1>
  );
};
