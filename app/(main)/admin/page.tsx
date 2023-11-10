import { serverTrpc } from "@/app/_trpc/server";
import { redirect } from "next/navigation";

const AdminPage = async () => {
  const res = await serverTrpc.admin.get.waitlist();

  if (!res.ok) {
    return redirect("/login");
  }

  const { waitlists } = res;

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-lg font-medium">Waitlsits: ({waitlists.length})</h1>
      <ul className="flex flex-col gap-2">
        {waitlists.map((waitlist) => (
          <li
            key={waitlist.submittedAt.toDateString()}
            className="list-disc text-muted-foreground"
          >
            {waitlist.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPage;
