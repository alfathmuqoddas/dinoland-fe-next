import { fetchWithAuth } from "@/lib/secureFetch";

export default async function MyBuildsItems({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { name, description } = await (
    await fetchWithAuth("http://localhost:8080/api/my-build/" + id)
  ).json();
  const myBuildItems = await (
    await fetchWithAuth("http://localhost:8080/api/my-build-item/" + id)
  ).json();

  return (
    <>
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Edit Build {name}</h1>
        <p className="text-gray-900">{description}</p>
      </div>
    </>
  );
}
