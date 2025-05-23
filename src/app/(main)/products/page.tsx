import { TProduct } from "@/lib/type/product";
// import Link from "next/link";
import { Category, SortBy, SortOrder } from "@/components/Sidebar";
import ProductCard from "@/components/Card/ProductCard";
import PageSelector from "@/components/Pagination/PageSelector";
import AddToMyBuildItem from "@/components/Buttons/AddToMyBuildItem";

export const Sidebar = async () => {
  const categories = await fetch("http://localhost:8080/api/productCategory", {
    cache: "no-store",
  });
  const categoriesData = await categories.json();
  return (
    <aside className="pb-8 flex-col gap-4 hidden md:flex">
      <Category items={categoriesData} />
      <SortBy items={["Price", "Name"]} />
      <SortOrder items={["Asc", "Desc"]} />
    </aside>
  );
};

const Products = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const { categoryId, sortBy, sortOrder, q, page, pageSize, buildId } =
    await searchParams;

  let url = "http://localhost:8080/api/product";

  const queryParams = new URLSearchParams() as any;

  if (q) {
    queryParams.append("q", q);
  }

  if (categoryId) {
    queryParams.append("categoryId", categoryId);
  }

  if (sortBy) {
    queryParams.append("sortBy", sortBy);
  }

  if (sortOrder) {
    queryParams.append("sortOrder", sortOrder);
  }

  if (page) {
    queryParams.append("page", page);
  }

  if (pageSize) {
    queryParams.append("pageSize", pageSize);
  }

  if (queryParams.toString()) {
    url += `?${queryParams.toString()}`;
  }
  const data = await fetch(url);
  const { products, totalRecords, totalPages, currentPage } = await data.json();

  return (
    <div className="md:flex md:gap-4">
      <div className="md:w-1/6">
        <Sidebar />
      </div>
      <div className="md:w-5/6 flex flex-col gap-x-4 gap-y-8">
        <div className="text-2xl font-bold">Total Records : {totalRecords}</div>
        <div className="w-full grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4">
          {products.length > 0 ? (
            products.map((product: TProduct) => (
              <ProductCard
                key={product.id}
                product={product}
                buildId={buildId}
              />
            ))
          ) : (
            <>No Product</>
          )}
        </div>
        <PageSelector totalPages={totalPages} />
      </div>
    </div>
  );
};

export default Products;
