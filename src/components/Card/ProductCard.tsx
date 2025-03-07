import { TProduct } from "@/lib/type/product";
import Link from "next/link";
import Image from "next/image";
import AddToMyBuildItem from "../Buttons/AddToMyBuildItem";

export default function ProductCard({
  product,
  buildId,
}: {
  product: TProduct;
  buildId: string | string[] | undefined;
}) {
  return (
    <div className="brutalist-card group h-full">
      <div className="relative overflow-hidden border-2 dark:border-border border-black rounded-[12px]">
        <Image
          src={
            product.image
              ? product.image
              : `https://picsum.photos/seed/${product.name}/1920/1080`
          }
          alt={product.name}
          loading="lazy"
          width={1920}
          height={1080}
          quality={50}
          className="w-full h-auto object-cover transform transition-transform group-hover:scale-110"
        />
        <div className="absolute top-0 right-0 bg-yellow-400 px-2 md:px-4 py-1 md:py-2 border-l-4 border-b-4 border-black font-bold text-xs md:text-sm text-black">
          ${product.price}
        </div>
      </div>
      <Link href={`/products/details/${product.id}`}>
        <h3 className="text-sm md:text-base font-bold mt-2 hover:text-pink-500">
          {product.name}
        </h3>
      </Link>
      {buildId ? (
        <AddToMyBuildItem buildId={buildId} productId={product.id} />
      ) : (
        ""
      )}
    </div>
  );
}
