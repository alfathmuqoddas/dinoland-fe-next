import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const cookiesStore = await cookies();

  if (!cookiesStore.get("accessToken")) {
    redirect("/login");
  }

  return <div>Dashboard</div>;
}
