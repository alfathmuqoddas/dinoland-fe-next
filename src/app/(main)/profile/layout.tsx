import NextBreadcrumb from "@/components/Breadcrumbs";
import { ChevronRight } from "lucide-react";

export default async function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 my-6">
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
