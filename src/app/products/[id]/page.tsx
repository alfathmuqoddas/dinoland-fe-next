import { TProduct } from "../type";
import SimilarProducts from "./components/SimilarProducts";

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
        <div className="flex gap-8">
          <div>
            <img
              src={`https://picsum.photos/seed/${productData.name}/320/180`}
              alt={productData.name}
              loading="lazy"
              className="w-full"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold">{productData.name}</h1>
            <p className="text-xl font-bold">${productData.price} USD</p>
            <div>{productData.description}</div>
          </div>
        </div>
      </section>
      <hr />
      <section>
        <SimilarProducts data={similarProductsDataFiltered} />
      </section>
    </div>
  );
}
