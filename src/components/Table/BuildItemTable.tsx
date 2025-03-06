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
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import RemoveMyBuildItemButton from "../Buttons/RemoveMyBuildItemButton";

const BuildItemByCategory = ({
  buildId,
  categoryData,
  data,
}: {
  buildId: any;
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
    <div className="overflow-x-auto brutalist-style">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-bold">Category</TableHead>
            <TableHead className="font-bold">Product Name</TableHead>
            <TableHead className="font-bold">Price</TableHead>
            <TableHead className="font-bold">Action</TableHead>
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
                    <Link
                      href={`/products?categoryId=${category.id}&buildId=${buildId}`}
                    >
                      <Button
                        variant={"blue"}
                        size={"sm"}
                        className="font-bold"
                      >
                        Select {category.name}
                        <Plus size={8} />
                      </Button>
                    </Link>
                  )}
                </TableCell>
                <TableCell>
                  {product ? `$${product.price.toFixed(2)}` : "Not Available"}
                </TableCell>
                <TableCell>
                  {product ? (
                    <RemoveMyBuildItemButton
                      buildId={buildId}
                      productId={product.id}
                    />
                  ) : (
                    ""
                  )}
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
