import { TMyBuildItem, TProductCategory } from "@/lib/type/product";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import Image from "next/image";

const BuildItemByCategory = ({
  categoryData,
  data,
}: {
  categoryData: TProductCategory[];
  data: TMyBuildItem[];
}) => {
  const productNamesByCategory = data.reduce<
    Record<number, { id: number; name: string; price: number; image: string }>
  >((acc, { product: { id, categoryId, name, price, image } }) => {
    acc[categoryId] = { id, name, price, image };
    return acc;
  }, {});

  const selectFromData = (id: number) => productNamesByCategory[id];

  return (
    <div className="overflow-x-auto text-black">
      <Table className="text-black">
        <TableHeader>
          <TableRow>
            <TableHead className="text-black font-bold">Category</TableHead>
            <TableHead className="text-black font-bold">Product Name</TableHead>
            <TableHead className="text-black font-bold">Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categoryData.map((category) => {
            const product = selectFromData(category.id);
            return (
              <TableRow key={category.id}>
                <TableCell>
                  <Link
                    href={`/products/?categoryId=${category.id}`}
                    className="default-link font-bold"
                  >
                    {category.name}
                  </Link>
                </TableCell>

                <TableCell>
                  {product ? (
                    <div
                      key={product.id}
                      className="flex flex-col md:flex-row gap-2 md:items-center"
                    >
                      <figure className="w-12 h-12 overflow-hidden rounded-lg border-2 border-black">
                        <Image
                          src={`https://picsum.photos/seed/${product?.image}/160/90`}
                          alt={product?.image}
                          width={160}
                          height={90}
                          className="object-cover h-full"
                        />
                      </figure>
                      <Link
                        href={`/products/details/${product.id}`}
                        className="default-link"
                      >
                        {product.name}
                      </Link>
                    </div>
                  ) : (
                    <>Not Available</>
                  )}
                </TableCell>
                <TableCell>
                  {product ? `$${product.price.toFixed(2)}` : "Not Available"}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default BuildItemByCategory;
