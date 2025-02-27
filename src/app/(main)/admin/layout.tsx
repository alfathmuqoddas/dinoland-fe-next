import { fetchWithAuth } from "@/lib/secureFetch";
import { redirect } from "next/navigation";
import NextBreadcrumb from "@/components/Breadcrumbs";
import { ChevronRight } from "lucide-react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const response = await fetchWithAuth(
    "http://localhost:8080/api/auth/isAdmin"
  );
  const { isAdmin } = await response.json();

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
