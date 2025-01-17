export default async function Home() {
  const data = await fetch("http://localhost:8080/api/product", {
    cache: "no-store",
  });
  const products = await data.json();

  type TProduct = {
    id: number;
    name: string;
    price: number;
    image: string;
    description: string;
    categoryId: number;
    createdAt: string;
    updatedAt: string;
  };

  return (
    <div className="flex flex-col gap-4 max-w-[480px] mx-auto">
      {products.map((item: TProduct) => (
        <div key={item.id} className="border border-pink-500 p-4 rounded-xl">
          <div>{item.name}</div>
          <div>{item.price}</div>
          <div>{item.description}</div>
          <div>{item.image}</div>
        </div>
      ))}
    </div>
  );
}
