import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookie = await cookies();
  const token = cookie.get("nextjs");

  if (token) {
    return <>{children}</>;
  }

  return redirect("/login");
}
