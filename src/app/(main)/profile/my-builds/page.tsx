import { fetchWithAuth } from "@/lib/secureFetch";
import Link from "next/link";
import BuildItemByCategory from "@/components/Table/BuildItemTable";
import { Pencil, Trash } from "lucide-react";
import { TMyBuild } from "@/lib/type/product";
import { AddNewBuild } from "@/components/Dialog/AddMyBuild";
import RemoveMyBuild from "@/components/Buttons/RemoveMyBuild";

export default async function MyBuilds({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { buildId } = await searchParams;

  // Use environment variable for API base URL for flexibility across environments
  const baseURL = process.env.API_BASE_URL || "http://localhost:8080/api";

  try {
    // Fetch data concurrently using Promise.all
    const [
      myBuildsResponse,
      myBuildDetailsResponse,
      myBuildItemsResponse,
      categoryDataResponse,
    ] = await Promise.all([
      fetchWithAuth(`${baseURL}/my-build/`),
      buildId
        ? fetchWithAuth(`${baseURL}/my-build/${buildId}`)
        : Promise.resolve(null),
      buildId
        ? fetchWithAuth(`${baseURL}/my-build-item/${buildId}`)
        : Promise.resolve(null),
      fetchWithAuth(`${baseURL}/productCategory`),
    ]);

    // Convert responses to JSON
    const myBuilds = await myBuildsResponse.json();
    const myBuildDetails =
      buildId && myBuildDetailsResponse
        ? await myBuildDetailsResponse.json()
        : null;
    const myBuildItems =
      buildId && myBuildItemsResponse
        ? await myBuildItemsResponse.json()
        : null;
    const categoryData = await categoryDataResponse.json();

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
                    Number(buildId) === myBuild.id
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
            {buildId && myBuildDetails ? (
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
                {myBuildItems && categoryData ? (
                  <BuildItemByCategory
                    data={myBuildItems}
                    categoryData={categoryData}
                  />
                ) : (
                  <div>No build items available.</div>
                )}
              </div>
            ) : (
              <div>No build selected</div>
            )}
          </section>
        </div>
      </>
    );
  } catch (err) {
    // Log error details for debugging
    console.error("Error fetching data:", err);
    // Fallback UI in case of errors
    return <div>Error loading builds. Please try again later.</div>;
  }
}
