import { fetchWithAuth, safeJson } from "@/lib/secureFetch";
import Link from "next/link";
import BuildItemByCategory from "@/components/Table/BuildItemTable";
import { TMyBuild } from "@/lib/type/product";
import { AddNewBuild } from "@/components/Dialog/AddMyBuild";
import RemoveMyBuild from "@/components/Buttons/RemoveMyBuild";
import { EditMyBuild } from "@/components/Dialog/EditMyBuild";

export default async function MyBuilds({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { buildId } = await searchParams;

  // Use environment variable for API base URL for flexibility across environments
  const baseURL = process.env.API_BASE_URL || "http://localhost:8080/api";

  let myBuildsResponse: Response | null = null;
  let myBuildDetailsResponse: Response | null = null;
  let myBuildItemsResponse: Response | null = null;
  let categoryDataResponse: Response | null = null;

  try {
    [
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
  } catch (err) {
    console.error("Error fetching one of the API endpoints:", err);
    return (
      <div className="p-4 text-red-600">
        <h2 className="font-bold text-xl mb-2">Failed to load data</h2>
        <p>Please refresh the page or try again later.</p>
      </div>
    );
  }

  const myBuilds = await safeJson(myBuildsResponse);
  const myBuildDetails = await safeJson(myBuildDetailsResponse);

  const myBuildItems = await safeJson(myBuildItemsResponse);
  const categoryData = await safeJson(categoryDataResponse);

  // UI FALLBACK HANDLERS
  const failedMyBuilds = !myBuilds || !Array.isArray(myBuilds);
  const failedCategory = !categoryData || !Array.isArray(categoryData);

  return (
    <>
      <h1 className="text-2xl font-bold ">My Builds</h1>
      <div className="flex flex-col md:flex-row gap-12 items-start mt-4">
        <aside className="w-full md:w-3/12">
          <div className="mb-8">
            <AddNewBuild />
          </div>
          <h1 className=" my-2">Saved Builds</h1>
          {failedMyBuilds ? (
            <div className="text-red-600">Failed to load builds.</div>
          ) : myBuilds.length === 0 ? (
            <div>You have no builds yet, please create one.</div>
          ) : (
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
          )}
        </aside>
        <section className="w-full md:w-9/12">
          {!buildId || !myBuildDetails ? (
            <div>No build selected</div>
          ) : (
            <div className="flex flex-col gap-8">
              {/* Build Details */}
              <div className="flex flex-col gap-4">
                <div>
                  <h1 className="text-2xl font-bold">
                    {myBuildDetails.name ?? "Unknown Build"}
                  </h1>
                  <p>{myBuildDetails.description}</p>
                </div>

                <div className="flex gap-4">
                  <EditMyBuild initialData={myBuildDetails} />
                  <RemoveMyBuild buildId={buildId} />
                </div>
              </div>

              {/* Build Items */}
              {!myBuildItems || !categoryData ? (
                <div>Failed to load items or categories.</div>
              ) : (
                <BuildItemByCategory
                  data={myBuildItems}
                  categoryData={categoryData}
                  buildId={buildId}
                />
              )}
            </div>
          )}
        </section>
      </div>
    </>
  );
}
