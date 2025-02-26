import { fetchWithAuth } from "@/lib/secureFetch";
import Link from "next/link";
import BuildItemByCategory from "@/components/Table/BuildItemTable";

export default async function MyBuildsLayout({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { buildId } = await searchParams;

  const myBuilds = await (
    await fetchWithAuth("http://localhost:8080/api/my-build/")
  ).json();

  const myBuildItems = await (
    await fetchWithAuth("http://localhost:8080/api/my-build-item/" + buildId)
  ).json();

  const categoryData = await (
    await fetchWithAuth("http://localhost:8080/api/productCategory")
  ).json();

  return (
    <>
      <h1 className="text-2xl font-bold text-gray-900">My Builds</h1>
      <div className="flex flex-col md:flex-row gap-12 items-start">
        <div className="flex flex-col gap-2 brutalist-style p-2 w-full md:w-3/12">
          {myBuilds.map((myBuild: any) => (
            <Link
              href={`/profile/my-builds?buildId=${myBuild.id}`}
              key={myBuild.id}
              className={`${
                buildId == myBuild.id ? "underline underline-offset-2" : ""
              }`}
            >
              {myBuild.name}
            </Link>
          ))}
        </div>
        <div className="w-full md:w-9/12">
          {buildId ? (
            <BuildItemByCategory
              data={myBuildItems}
              categoryData={categoryData}
            />
          ) : (
            <div>No build selected</div>
          )}
        </div>
      </div>
    </>
  );
}
