import { ShoppingCart } from "lucide-react";
import { TProduct } from "./type";

const Products = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const data = await fetch("http://localhost:8080/api/product", {
    cache: "no-store",
  });
  const products = await data.json();

  const { filter, sort } = await searchParams;

  return (
    <div>
      <h1 className="text-5xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-yellow-400">
        Featured Products
      </h1>
      <div>Filter by: {filter}</div>
      <div>Sort by: {sort}</div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product: TProduct) => (
          <div key={product.id} className="brutalist-card group">
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
            <button className="brutalist-button w-full flex items-center justify-center space-x-2">
              <ShoppingCart className="w-5 h-5" />
              <span>ADD TO CART</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
