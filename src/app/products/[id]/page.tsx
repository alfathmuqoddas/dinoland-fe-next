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

  return (
    <div>
      <h1>Product Details {id}</h1>
      <div>{productData.name}</div>
    </div>
  );
}
