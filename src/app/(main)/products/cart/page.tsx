import CartItemCard from "@/components/Card/CartItemCard";
import { fetchWithAuth, safeJson } from "@/lib/secureFetch";
import { ShoppingBasket } from "lucide-react";
import type { TCartItem } from "@/lib/type/cart";

export default async function Cart() {
  let cartDataResponse: Response | null = null;

  try {
    cartDataResponse = await fetchWithAuth("http://localhost:8080/api/cart");
  } catch (err) {
    console.error("Error fetching one of the API endpoints:", err);
    return (
      <div className="p-4 text-red-600">
        <h2 className="font-bold text-xl mb-2">Failed to load data</h2>
        <p>Please refresh the page or try again later.</p>
      </div>
    );
  }

  const cartData = (await safeJson(cartDataResponse)) as {
    cartItem: any;
    totalPrice: number;
    totalQuantity: number;
  };

  const { cartItem, totalPrice, totalQuantity } = cartData as {
    cartItem: TCartItem[];
    totalPrice: number;
    totalQuantity: number;
  };

  return (
    <>
      <h1 className="text-3xl font-bold my-4 ">Cart</h1>
      <section className="flex flex-col md:flex-row gap-2 md:gap-8 items-start">
        <section className="w-full md:w-8/12">
          <div className="flex flex-col gap-2 md:gap-4">
            {cartItem ? (
              cartItem.map((product) => (
                <CartItemCard
                  key={product.id}
                  name={product.items.name}
                  price={product.items.price}
                  productId={product.productId}
                  quantity={product.quantity}
                />
              ))
            ) : (
              <p>Your cart is empty</p>
            )}
          </div>
        </section>
        <section className="order-first md:order-last w-full md:w-4/12 brutalist-style p-6 flex flex-col gap-4">
          <div>
            <h1 className="text-xl font-bold">Total Price</h1>
            <p className="font-bold">${totalPrice} USD</p>
          </div>
          <div>
            <h1 className="text-xl font-bold">Total Quantity</h1>
            <p className="font-bold">{totalQuantity}</p>
          </div>
          <button className="bg-blue-500 border-[3px] border-black text-white font-xl font-bold px-4 py-2 rounded-xl">
            <div className="flex gap-2 justify-center items-center">
              <ShoppingBasket />
              <p>Checkout</p>
            </div>
          </button>
        </section>
      </section>
    </>
  );
}
