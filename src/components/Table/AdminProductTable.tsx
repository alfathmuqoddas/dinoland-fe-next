import {
  ChevronDown,
  ChevronUp,
  ChevronsUpDown,
  Edit,
  Trash,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import DeleteAdminProduct from "./DeleteAdminProduct";
import { TProductDTO } from "@/lib/type/product";

export default async function AdminProductTable({
  data,
}: {
  data: TProductDTO[];
}) {
  return (
    <div className="overflow-x-auto brutalist-style">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-bold">No</TableHead>
            <TableHead className="font-bold">Name</TableHead>
            <TableHead className="font-bold">Category</TableHead>
            <TableHead className="font-bold">Price</TableHead>
            <TableHead className="font-bold">Created At</TableHead>
            <TableHead className="font-bold">Updated At</TableHead>
            <TableHead className="font-bold">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((item: TProductDTO, index: number) => (
            <TableRow
              key={item.id}
              className={
                index % 2 === 0 ? "light:bg-white" : "light:bg-gray-50"
              }
            >
              <TableCell className="text-center">{index + 1}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.category.name}</TableCell>
              <TableCell>${item.price}</TableCell>
              <TableCell>
                {new Date(item.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell>
                {new Date(item.updatedAt).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-center space-x-2">
                <Link href={`/admin/edit/${item.id}`}>
                  <button className="p-1 text-blue-600 hover:text-blue-800">
                    <Edit className="h-5 w-5" />
                  </button>
                </Link>
                <DeleteAdminProduct productId={item.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
