import { SortableTable } from "@/components/Table/SortTable";

export default async function Admin() {
  const response = await fetch("http://localhost:8080/api/product?pageSize=50");
  const { products } = await response.json();
  const columns: any = [
    { key: "name", label: "Name" },
    { key: "category.name", label: "Category" },
    { key: "price", label: "Price" },
    { key: "createdAt", label: "Created At" },
    { key: "updatedAt", label: "Updated At" },
  ];

  const handleEdit = (id: string | number) => {
    alert("Editing " + id);
  };

  const handleDelete = (id: string | number) => {
    alert("Deleting " + id);
  };
  return (
    <>
      <h1>Admin</h1>
      <SortableTable data={products} columns={columns} />
    </>
  );
}
