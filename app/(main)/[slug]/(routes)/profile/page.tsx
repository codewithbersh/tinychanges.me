import { notFound } from "next/navigation";
import { getCurrentUser } from "@/lib/get-current-user";

import { Form } from "./_components/form";

interface ProfilePageProps {
  params: {
    slug: string;
  };
}

const ProfilePage = async ({ params: { slug } }: ProfilePageProps) => {
  const user = await getCurrentUser();
  if (!user || user.slug !== slug) {
    notFound();
  }
  return <Form />;
};

export default ProfilePage;
