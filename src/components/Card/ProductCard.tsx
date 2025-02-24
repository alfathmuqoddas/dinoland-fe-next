import { TProduct } from "@/lib/type/product";
import Link from "next/link";
import Image from "next/image";

export default function ProductCard({ product }: { product: TProduct }) {
  return (
    <Link key={product.id} href={`/products/details/${product.id}`}>
      <div className="brutalist-card group h-full">
        <div className="relative overflow-hidden border-[3px] rounded-[12px] border-black">
          <Image
            src={`https://picsum.photos/seed/${product.name}/1920/1080`}
            alt={product.name}
            loading="lazy"
            width={1920}
            height={1080}
            quality={50}
            className="w-full h-auto object-cover transform transition-transform group-hover:scale-110"
          />
          <div className="absolute top-0 right-0 bg-yellow-400 px-2 md:px-4 py-1 md:py-2 border-l-4 border-b-4 border-black font-bold">
            ${product.price}
          </div>
        </div>
        <h3 className="text-base md:text-xl font-bold mt-2">{product.name}</h3>
      </div>
    </Link>
  );
}
