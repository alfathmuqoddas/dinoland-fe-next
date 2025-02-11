// import { Link as LinkIcon, ShoppingCart } from "lucide-react";
import { TProduct } from "./type";
import Link from "next/link";
import { Category, SortBy, SortOrder } from "@/components/Sidebar";
import ProductCard from "@/components/Card/ProductCard";

export const Sidebar = async () => {
  const categories = await fetch("http://localhost:8080/api/productCategory", {
    cache: "no-store",
  });
  const categoriesData = await categories.json();
  return (
    <aside className="pb-8 w-1/6 flex-col gap-4 hidden md:flex">
      <Category items={categoriesData} />
      <SortBy items={["price", "name"]} />
      <SortOrder items={["asc", "desc"]} />
    </aside>
  );
};

const Products = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const { categoryId, sortBy, sortOrder, q } = await searchParams;

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

  if (queryParams.toString()) {
    url += `?${queryParams.toString()}`;
  }
  const data = await fetch(url, { cache: "no-store" });
  const products = await data.json();

  return (
    <div className="flex gap-4">
      <Sidebar />
      <div className="w-full grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.length > 0 ? (
          products.map((product: TProduct) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <>No Product</>
        )}
      </div>
    </div>
  );
};

export default Products;
