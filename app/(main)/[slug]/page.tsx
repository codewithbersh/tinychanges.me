import { serverTrpc } from "@/app/_trpc/server";
import { notFound } from "next/navigation";

interface HabitsPageProps {
  params: {
    slug: string;
  };
}

const HabitsPage = async ({ params: { slug } }: HabitsPageProps) => {
  const user = await serverTrpc.user.get({ slug });

  if (!user) {
    return notFound();
  }

  return <div>{slug}</div>;
};

export default HabitsPage;
