import { fetchWithAuth } from "@/lib/secureFetch";
import Link from "next/link";
import BuildItemByCategory from "@/components/Table/BuildItemTable";
import { Pencil, Trash } from "lucide-react";
import { TMyBuild } from "@/lib/type/product";
import { AddNewBuild } from "@/components/Dialog/AddMyBuild";
import { Button } from "@/components/ui/button";
import RemoveMyBuild from "@/components/Buttons/RemoveMyBuild";

export default async function MyBuilds({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { buildId } = await searchParams;

  const myBuilds = await (
    await fetchWithAuth("http://localhost:8080/api/my-build/")
  ).json();

  const myBuildDetails = await (
    await fetchWithAuth("http://localhost:8080/api/my-build/" + buildId)
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
      <div className="flex flex-col md:flex-row gap-12 items-start mt-4">
        <aside className="w-full md:w-3/12">
          <div className="mb-8">
            <AddNewBuild />
          </div>
          <h1 className="text-gray-900 my-2">Saved Builds</h1>
          <div className="flex flex-col gap-2 brutalist-style p-2">
            {myBuilds.map((myBuild: TMyBuild) => (
              <Link
                href={`/profile/my-builds?buildId=${myBuild.id}`}
                key={myBuild.id}
                className={`${
                  Number(buildId) == myBuild.id
                    ? "underline underline-offset-4"
                    : ""
                }`}
              >
                {myBuild.name}
              </Link>
            ))}
          </div>
        </aside>
        <section className="w-full md:w-9/12">
          {buildId ? (
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                <h1 className="text-2xl font-bold text-gray-900">
                  {myBuildDetails.name}
                </h1>
                <div className="flex gap-2">
                  <Link
                    href={"my-builds/edit/" + buildId}
                    className="brutalist-button-custom bg-blue-600 h-10 px-8"
                  >
                    Edit this Build <Pencil className="h-4 w-4" />
                  </Link>
                  <RemoveMyBuild buildId={buildId} />
                </div>
              </div>
              <BuildItemByCategory
                data={myBuildItems}
                categoryData={categoryData}
              />
            </div>
          ) : (
            <div>No build selected</div>
          )}
        </section>
      </div>
    </>
  );
}
