import { TProduct } from "@/app/products/type";
import Link from "next/link";

export default function ProductCard({ product }: { product: TProduct }) {
  return (
    <Link key={product.id} href={`/products/details/${product.id}`}>
      <div className="brutalist-card group">
        <div className="relative overflow-hidden mb-4 border-[3px] rounded-[12px] border-black">
          <img
            src={`https://picsum.photos/seed/${product.name}/320/180`}
            alt={product.name}
            loading="lazy"
            width={320}
            height={180}
            className="w-full h-auto object-cover transform transition-transform group-hover:scale-110"
          />
          <div className="absolute top-0 right-0 bg-yellow-400 px-2 md:px-4 py-1 md:py-2 border-l-4 border-b-4 border-black font-bold">
            ${product.price}
          </div>
        </div>
        <h3 className="text-base md:text-xl font-bold mb-2">{product.name}</h3>
      </div>
    </Link>
  );
}
