import { Link as LinkIcon, ShoppingCart } from "lucide-react";
import { TProduct } from "./type";
import Link from "next/link";

const Products = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const { categoryId, sortBy, sortOrder, q } = await searchParams;

  let url = "http://localhost:8080/api/product";

  const queryParams = new URLSearchParams();

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
    <div>
      <h1 className="text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-yellow-400">
        Featured Products
      </h1>
      <div className="py-8">
        <div>Category: {categoryId}</div>
        <div>Sort by: {sortBy}</div>
        <div>Sort Order: {sortOrder}</div>
        <div>Products: {products.length}</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.length > 0 ? (
          products.map((product: TProduct) => (
            <Link key={product.id} href={`/products/${product.id}`}>
              <div className="brutalist-card group">
                <div className="relative overflow-hidden mb-4 border-4 border-black">
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
                {/* <button
                className="brutalist-button w-full flex items-center justify-center space-x-2"
                onClick={() => alert("Added to cart")}
              >
                <ShoppingCart className="w-5 h-5" />
                <span>ADD TO CART</span>
              </button> */}
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
