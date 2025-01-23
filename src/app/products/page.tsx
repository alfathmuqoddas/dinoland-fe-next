import { Link as LinkIcon, ShoppingCart } from "lucide-react";
import { TProduct } from "./type";
import Link from "next/link";
import { Category, SortBy, SortOrder } from "@/app/components/Sidebar";

export const Sidebar = async () => {
  const categories = await fetch("http://localhost:8080/api/productCategory", {
    cache: "no-store",
  });
  const categoriesData = await categories.json();
  return (
    <aside className="pb-8 w-1/6 flex flex-col gap-4">
      <div>
        <div>Categories:</div>
        <Category items={categoriesData} />
      </div>

      <div>
        <div>Sort By:</div>
        <SortBy items={["price", "name"]} />
      </div>

      <div>
        <div>Sort Order:</div>
        <SortOrder items={["asc", "desc"]} />
      </div>
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
            <Link key={product.id} href={`/products/${product.id}`}>
              <div className="brutalist-card group">
                <div className="relative overflow-hidden mb-4 border-[3px] rounded-[12px] border-black">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover transform transition-transform group-hover:scale-110"
                  />
                  <div className="absolute top-0 right-0 bg-yellow-400 px-4 py-2 border-l-4 border-b-4 border-black font-bold">
                    ${product.price}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">{product.name}</h3>
              </div>
            </Link>
          ))
        ) : (
          <>No Product</>
        )}
      </div>
    </div>
  );
};

export default Products;
