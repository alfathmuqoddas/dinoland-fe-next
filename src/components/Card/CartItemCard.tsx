import { Trash } from "lucide-react";

export default async function CartItemCard({
  name,
  price,
}: {
  name: string;
  price: number;
}) {
  //cart item cart brutalism style
  return (
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
        <h3 className="text-3xl font-bold">{name}</h3>
        <p className="text-xl font-bold">${price} USD</p>
      </div>
    </div>
  );
}
