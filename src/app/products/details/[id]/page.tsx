import { TProduct } from "../../type";
import AddToCartButton from "../../../../components/Buttons/AddToCartButton";
import ProductCard from "@/components/Card/ProductCard";

export default async function ProductDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = await fetch(`http://localhost:8080/api/product/${id}`, {
    cache: "no-store",
  });

  const productData = await product.json();

  const similarProducts = await fetch(
    `http://localhost:8080/api/product?categoryId=${productData.categoryId}`,
    {
      cache: "no-store",
    }
  );

  const similarProductsData = await similarProducts.json();
  const similarProductsDataFiltered = similarProductsData.filter(
    (product: TProduct) => product.id.toString() !== id
  );

  return (
    <div>
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          <div className="rounded-2xl border-4 border-black overflow-hidden shadow-[4px_4px_0px_rgba(0,0,0,1)]">
            <img
              src={`https://picsum.photos/seed/${productData.name}/320/180`}
              alt={productData.name}
              loading="lazy"
              className="w-full"
            />
          </div>
          <div className="text-gray-900 flex flex-col gap-4">
            <h1 className="text-3xl font-bold">{productData.name}</h1>
            <p className="text-xl font-bold">${productData.price} USD</p>
            <div>{productData.description}</div>
            <AddToCartButton productId={productData.id} />
          </div>
        </div>
      </section>
      <section>
        <h1 className="text-3xl font-bold mt-16 mb-4 text-gray-900">
          Similar Products
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {similarProductsDataFiltered.map((product: TProduct) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
