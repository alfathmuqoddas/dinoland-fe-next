import ProductCard from "@/components/Card/ProductCard";
import { TProduct } from "../../type";

export default function SimilarProducts({ data }: { data: TProduct[] }) {
  return (
    <div className="text-gray-900">
      <h1 className="text-3xl font-bold mt-16 mb-4">Similar Products</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {data.map((product: TProduct) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
