import RemoveFromCartButton from "../Buttons/RemoveFromCartButton";
import CartItemQuantityButton from "../Buttons/CartItemQuantityButton";

export default async function CartItemCard({
  name,
  price,
  productId,
  quantity,
}: {
  name: string;
  price: number;
  productId: number;
  quantity: number;
}) {
  //cart item cart brutalism style
  return (
    <div className="flex justify-between items-start">
      <div className="flex gap-4">
        <div className="relative w-64 overflow-hidden border-[4px] rounded-2xl border-black">
          <img
            src={`https://picsum.photos/seed/${name}/320/180`}
            alt={name}
            loading="lazy"
            width="320"
            height="180"
            className="w-full h-auto object-cover"
          />
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-bold">{name}</h3>
          <p className="font-bold">${price} USD</p>
          <div>
            <CartItemQuantityButton quantity={quantity} productId={productId} />
          </div>
        </div>
      </div>
      <RemoveFromCartButton productId={productId} />
    </div>
  );
}
