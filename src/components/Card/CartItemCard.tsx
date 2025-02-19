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
        <div className="relative overflow-hidden border-[3px] rounded-[12px] border-black">
          <img
            src={`https://picsum.photos/seed/${name}/320/180`}
            alt={name}
            loading="lazy"
            className="w-full h-20 object-cover"
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
