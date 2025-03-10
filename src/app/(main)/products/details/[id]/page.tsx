import { TProduct } from "@/lib/type/product";
import AddToCartButton from "../../../../../components/Buttons/AddToCartButton";
import ProductCard from "@/components/Card/ProductCard";
import Image from "next/image";

export default async function ProductDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = await fetch(`http://localhost:8080/api/product/${id}`);

  const productData = await product.json();

  const similarProducts = await fetch(
    `http://localhost:8080/api/product?categoryId=${productData.categoryId}`
  );

  const { products: similarProductsData } = await similarProducts.json();
  const similarProductsDataFiltered = similarProductsData.filter(
    (product: TProduct) => product.id.toString() !== id
  );

  return (
    <div className="flex flex-col gap-4">
      <section className="mt-4 md:mt-8">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 ">
          <div className="brutalist-style overflow-hidden md:w-1/2">
            <Image
              src={
                productData.image
                  ? productData.image
                  : `https://picsum.photos/seed/${productData.name}/1920/1080`
              }
              alt={productData.name}
              loading="lazy"
              width="1920"
              height="1080"
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="flex flex-col gap-4 md:w-1/2">
            <h1 className="text-3xl font-bold">{productData.name}</h1>
            <p className="text-xl font-bold">${productData.price} USD</p>
            <div>{productData.description}</div>
            <AddToCartButton productId={productData.id} />
          </div>
        </div>
      </section>
      <section>
        <h1 className="text-3xl font-bold my-8 ">Similar Products</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
          {similarProductsDataFiltered.map((product: TProduct) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
