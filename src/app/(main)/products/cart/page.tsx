import CartItemCard from "@/components/Card/CartItemCard";
import { fetchWithAuth } from "@/lib/secureFetch";
import { ShoppingBasket } from "lucide-react";

export default async function Cart() {
  const response = await fetchWithAuth("http://localhost:8080/api/cart");
  const cartData = await response.json();
  const { cartItem, totalPrice, totalQuantity } = cartData;

  return (
    <>
      <h1 className="text-3xl font-bold my-4 ">Cart</h1>
      <section className="flex flex-col md:flex-row gap-2 md:gap-8 items-start">
        <section className="w-full md:w-8/12">
          <div className="flex flex-col gap-2 md:gap-4">
            {cartItem ? (
              cartItem.map((product: any) => (
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
