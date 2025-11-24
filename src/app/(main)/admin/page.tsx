import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import AdminProductTable from "@/components/Table/AdminProductTable";
import { fetchWithAuth, safeJson } from "@/lib/secureFetch";
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

  let productsResponse: Response | null = null;
  let categoriesResponse: Response | null = null;

  try {
    [productsResponse, categoriesResponse] = await Promise.all([
      fetchWithAuth(url),
      fetchWithAuth("http://localhost:8080/api/productCategory"),
    ]);
  } catch (err) {
    console.error("Error fetching one of the API endpoints:", err);
    return (
      <div className="p-4 text-red-600">
        <h2 className="font-bold text-xl mb-2">Failed to load data</h2>
        <p>Please refresh the page or try again later.</p>
      </div>
    );
  }

  const products = await safeJson(productsResponse);
  const categories = await safeJson(categoriesResponse);

  const failedCategory = !categories;
  const failedProducts = !products;

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Admin</h1>
      <div className="flex flex-col md:flex-row gap-2 justify-between">
        <div>
          <FilterProductNameInput />
        </div>
        <div className="flex gap-2">
          <PageSizeDropdown />
          {failedCategory ? (
            <>Error Loading Category</>
          ) : categories.length === 0 ? (
            <>No Categories found</>
          ) : (
            <FilterCategoryDropdown categories={categories} />
          )}
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
      {failedProducts ? (
        <>No Products</>
      ) : (
        <>
          <AdminProductTable data={products.products} />
          <PageSelector totalPages={products.totalPages} path="admin" />
        </>
      )}
    </div>
  );
}
