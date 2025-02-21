import { SortableTable } from "@/components/Table/SortTable";
import { deleteProductAction } from "@/actions/admin/deleteProductAction";

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
      <h1>Admin</h1>
      <SortableTable
        data={flattenedProducts}
        columns={columns}
        onDelete={deleteProductAction}
      />
    </>
  );
}
