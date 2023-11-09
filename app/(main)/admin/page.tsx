import { serverTrpc } from "@/app/_trpc/server";
import { redirect } from "next/navigation";

const AdminPage = async () => {
  const res = await serverTrpc.admin.get.waitlist();

  if (!res.ok) {
    return redirect("/login");
  }

  return (
    <div>
      <h1 className="text-2xl font-medium">Waitlsits: {res.count}</h1>
    </div>
  );
};

export default AdminPage;
