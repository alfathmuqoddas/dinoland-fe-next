import { SortableTable } from "@/components/Table/SortTable";
import { deleteProductAction } from "@/actions/admin/deleteProductAction";
import Link from "next/link";

export default async function Admin() {
  const response = await fetch("http://localhost:8080/api/product?pageSize=50");
  const { products } = await response.json();
  const flattenedProducts = products.map((product: any) => {
    const { category, ...rest } = product;
    return {
      ...rest,
      categoryName: category.name,
    };
  });
  const columns: any = [
    { key: "name", label: "Name" },
    { key: "categoryName", label: "Category" },
    { key: "price", label: "Price" },
    { key: "createdAt", label: "Created At" },
    { key: "updatedAt", label: "Updated At" },
  ];

  return (
    <>
      <div className="flex flex-col gap-4">
        <h1>Admin</h1>
        <div>
          <button className="brutalist-button">
            <Link href="/admin/add">Add New</Link>
          </button>
        </div>
        <SortableTable
          data={flattenedProducts}
          columns={columns}
          onDelete={deleteProductAction}
        />
      </div>
    </>
  );
}
