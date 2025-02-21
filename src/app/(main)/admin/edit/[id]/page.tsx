import { fetchWithAuth } from "@/lib/secureFetch";

export default async function Edit({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const response = await fetchWithAuth(
    "http://localhost:8080/api/product/" + id
  );
  const { name, description, price } = await response.json();

  return (
    <>
      <div>{name}</div>
      <div>{description}</div>
      <div>{price}</div>
    </>
  );
}
