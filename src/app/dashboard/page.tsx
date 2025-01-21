import { cookies } from "next/headers";
// import { redirect } from "next/navigation";

import { fetchWithAuth } from "../lib/secureFetch";

export default async function Dashboard() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  const response = await fetchWithAuth(
    "http://localhost:8080/api/dashboard/protected",
    {
      accessToken,
      refreshToken,
    }
  );

  if (!response.ok) {
    throw new Error("Could not fetch dashboard");
  }

  const { data } = await response.json();

  return (
    <div>
      <h1>Dashboard</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
