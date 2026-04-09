import { TProduct } from "@/type/product";
import { Category, SortBy, SortOrder } from "@/components/Sidebar";
import ProductCard from "@/components/Card/ProductCard";
import PageSelector from "@/components/Pagination/PageSelector";

export const Sidebar = async () => {
  const categories = await fetch("http://localhost:8080/api/productCategory", {
    cache: "no-store",
  });
  const categoriesData = await categories.json();
  return (
    <aside className="pt-8 flex-col gap-4 hidden md:flex md:w-1/6 border-r-2 border-black">
      <Category items={categoriesData.data} />
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
  const { data: productData } = await data.json();
  const { products, totalRecords, totalPages, currentPage } = productData;

  return (
    <div className="md:flex md:gap-8">
      <Sidebar />

      <div className="md:w-5/6 flex flex-col gap-8 py-8">
        <div className="text-2xl font-bold">Total Records : {totalRecords}</div>
        <div className="w-full grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
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
