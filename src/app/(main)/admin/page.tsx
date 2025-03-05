import Link from "next/link";
import { Plus, RedoIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import AdminProductTable from "@/components/Table/AdminProductTable";
import { fetchWithAuth } from "@/lib/secureFetch";
import PageSizeDropdown from "@/components/Admin/PageSizeDropdown";
import FilterCategoryDropdown from "@/components/Admin/FilterCategoryDropdown";
import FilterProductNameInput from "@/components/Admin/FilterProductNameInput";
import PageSelector from "@/components/Pagination/PageSelector";
import {
  SortByDropdown,
  SortOrderDropdown,
} from "@/components/Admin/SortByDropdown";

export default async function Admin({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { categoryId, sortBy, sortOrder, q, page, pageSize } =
    await searchParams;

  let url = `http://localhost:8080/api/product`;

  const params = new URLSearchParams() as any;

  if (page) {
    params.append("page", page);
  }

  params.append("pageSize", pageSize ? pageSize.toString() : "10");

  if (categoryId) {
    params.append("categoryId", categoryId);
  }

  if (sortBy) {
    params.append("sortBy", sortBy);
  }

  if (sortOrder) {
    params.append("sortOrder", sortOrder);
  }

  if (q) {
    params.append("q", q);
  }

  if (params.toString()) {
    url += `?${params.toString()}`;
  }

  const products = await (await fetchWithAuth(url)).json();
  const categories = await (
    await fetchWithAuth("http://localhost:8080/api/productCategory")
  ).json();

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Admin</h1>
      <div className="flex flex-col md:flex-row gap-2 justify-between">
        <div>
          <FilterProductNameInput />
        </div>
        <div className="flex gap-2">
          <PageSizeDropdown />
          <FilterCategoryDropdown categories={categories} />
          <SortByDropdown />
          <SortOrderDropdown />
        </div>
        <div>
          <Link href="/admin/add">
            <Button variant={"warning"} size={"lg"} className="font-bold">
              Add Product <Plus className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
      <AdminProductTable data={products.products} />
      <PageSelector totalPages={products.totalPages} path="admin" />
    </div>
  );
}
