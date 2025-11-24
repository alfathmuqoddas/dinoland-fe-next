import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import NextBreadcrumb from "@/components/Breadcrumbs";
import { ChevronRight } from "lucide-react";
import { getRoleFromToken } from "@/lib/auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const isAuthenticated = Boolean(accessToken);

  let isAdmin = false;

  if (isAuthenticated && accessToken) {
    const role = await getRoleFromToken(accessToken);
    isAdmin = role === "admin";
  }

  if (!isAdmin) {
    redirect("/login");
  }

  return (
    <div className="flex flex-col gap-4">
      <NextBreadcrumb
        homeElement={"Home"}
        separator={<ChevronRight className="w-4 h-4" />}
        activeClasses="font-bold text-sm"
        containerClasses="flex items-center"
        listClasses="hover:underline text-sm"
        capitalizeLinks
      />
      {children}
    </div>
  );
}
