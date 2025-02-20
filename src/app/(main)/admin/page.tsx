import { fetchWithAuth } from "@/lib/secureFetch";
import { redirect } from "next/navigation";

export default async function Admin() {
  const response = await fetchWithAuth(
    "http://localhost:8080/api/auth/isAdmin"
  );
  const { isAdmin } = await response.json();

  if (!isAdmin) {
    redirect("/login");
  }

  return <div>Admin: {isAdmin ? "true" : "false"}</div>;
}
