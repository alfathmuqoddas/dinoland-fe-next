import { TProduct } from "@/type/product";
import Link from "next/link";
import Image from "next/image";
import AddToMyBuildItem from "../Buttons/AddToMyBuildItem";

export default function ProductCard({
  product,
  buildId,
}: {
  product: TProduct;
  buildId?: string | string[] | undefined;
}) {
  return (
    <div className="brutalist-card group h-full transform transition-transform hover:scale-105">
      <div className="relative overflow-hidden border-2 dark:border-border border-black rounded-[12px]">
        <Image
          src={
            product.image
              ? `https://picsum.photos/seed/${product.image}/1920/1080`
              : `https://picsum.photos/seed/${product.name}/1920/1080`
          }
          alt={product.name}
          loading="lazy"
          width={1920}
          height={1080}
          quality={50}
          className="w-full h-auto object-cover"
        />
      </div>
      <Link href={`/products/details/${product.id}`}>
        <div className="flex justify-between items-center mt-2 gap-4">
          <h3 className="text-sm md:text-xl font-heading font-bold hover:text-pink-500">
            {product.name}
          </h3>
          <p className="text-right">${product.price}</p>
        </div>
      </Link>
      {buildId ? (
        <AddToMyBuildItem buildId={buildId} productId={product.id} />
      ) : (
        ""
      )}
    </div>
  );
}
