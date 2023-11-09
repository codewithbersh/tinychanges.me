import Link from "next/link";
import { redirect } from "next/navigation";

const Home = () => {
  if (true) {
    return redirect("/login");
    // return redirect("/waitlist");
  }

  return (
    <div className="grid h-full place-items-center">
      <div className="space-y-6 text-center">
        <h1 className="text-2xl font-medium">tinychanges.me</h1>
        <Link
          href="https://twitter.com/codewithbersh"
          target="_blank"
          className="text-sm text-muted-foreground underline"
        >
          codewithbersh
        </Link>
      </div>
    </div>
  );
};

export default Home;
