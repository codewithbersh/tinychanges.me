import Link from "next/link";

const Home = () => {
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
