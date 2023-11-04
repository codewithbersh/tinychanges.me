import Link from "next/link";
import { redirect } from "next/navigation";

const Home = () => {
  if (true) {
    return redirect("/waitlist");
  }

  return (
    <div className="grid place-items-center h-full">
      <div className="space-y-6 text-center">
        <h1 className="text-2xl font-medium">tinychanges.me</h1>
        <Link
          href="https://twitter.com/codewithbersh"
          target="_blank"
          className="text-muted-foreground text-sm underline"
        >
          codewithbersh
        </Link>
      </div>
    </div>
  );
};

export default Home;
