import { cookies } from "next/headers";
import CartItemCard from "@/components/Card/CartItemCard";

export default async function Cart() {
  const accessToken = (await cookies()).get("accessToken")?.value;

  const response = await fetch("http://localhost:8080/api/cart", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const cartData = await response.json();
  const { cartItem, totalPrice, totalQuantity } = cartData;

  return (
    <main>
      <h1 className="text-3xl font-bold my-8">Cart</h1>
      <section className="flex gap-8">
        <section className="rounded-3xl text-gray-800 border-[3px] border-black p-4 bg-white shadow-[4px_4px_0px_rgb(0,0,0)] w-8/12">
          <div className="flex flex-col gap-6">
            {cartItem.map((product: any) => (
              <CartItemCard
                key={product.id}
                name={product.items.name}
                price={product.items.price}
              />
            ))}
          </div>
        </section>
        <section className="w-4/12 bg-white shadow-[4px_4px_0px_rgb(0,0,0)] p-4 rounded-3xl border-[3px] border-black text-black flex flex-col gap-4">
          <div>
            <h1 className="text-3xl font-bold">Total Price</h1>
            <p className="text-xl font-bold">${totalPrice} USD</p>
          </div>
          <div>
            <h1 className="text-3xl font-bold">Total Quantity</h1>
            <p className="text-xl font-bold">{totalQuantity}</p>
          </div>
        </section>
      </section>
    </main>
  );
}
