import RemoveFromCartButton from "../Buttons/RemoveFromCartButton";
import CartItemQuantityButton from "../Buttons/CartItemQuantityButton";
import Image from "next/image";

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
    <div className="brutalist-style p-4 flex justify-between items-start">
      <div className="flex gap-4 items-start">
        <figure className="relative w-20 h-20 overflow-hidden border-2 rounded-xl border-black">
          <Image
            src={`https://picsum.photos/seed/${name}/320/180`}
            alt={name}
            loading="lazy"
            width={320}
            height={180}
            className="h-full object-cover"
          />
        </figure>
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
