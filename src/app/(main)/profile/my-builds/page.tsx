import { fetchWithAuth, safeJson } from "@/lib/secureFetch";
import Link from "next/link";
import BuildItemByCategory from "@/components/Table/BuildItemTable";
import { AddNewBuild } from "@/components/Dialog/AddMyBuild";
import RemoveMyBuild from "@/components/Buttons/RemoveMyBuild";
import { EditMyBuild } from "@/components/Dialog/EditMyBuild";
import type {
  TMyBuildDetailResponse,
  TMyBuildItemResponse,
  TMyBuildResponse,
} from "@/type/build";
import { TProductCategoryResponse } from "@/type/category";
import { redirect } from "next/navigation";

export default async function MyBuilds({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { buildId } = await searchParams;

  const baseURL = process.env.BASE_API_URL || "http://localhost:8080/api";

  const [
    myBuildsResponse,
    myBuildDetailsResponse,
    myBuildItemsResponse,
    categoryDataResponse,
  ] = await Promise.all([
    fetchWithAuth(`${baseURL}/my-build`),
    fetchWithAuth(`${baseURL}/my-build/${buildId}`),
    fetchWithAuth(`${baseURL}/my-build-item/${buildId}`),
    fetchWithAuth(`${baseURL}/productCategory`),
  ]);

  const responses = [
    myBuildsResponse,
    myBuildDetailsResponse,
    myBuildItemsResponse,
    categoryDataResponse,
  ];

  if (responses.some((res) => res.status === 401)) {
    redirect("/login");
  }

  if (responses.some((res) => !res.ok)) {
    return (
      <div className="p-4 text-red-600">
        <h2 className="font-bold text-xl mb-2">Failed to load data</h2>
        <p>Please refresh the page or try again later.</p>
      </div>
    );
  }

  const { data: myBuilds } = await safeJson<TMyBuildResponse>(myBuildsResponse);

  const { data: myBuildDetails } = await safeJson<TMyBuildDetailResponse>(
    myBuildDetailsResponse,
  );

  const { data: myBuildItems } =
    await safeJson<TMyBuildItemResponse>(myBuildItemsResponse);

  const { data: categoryData } =
    await safeJson<TProductCategoryResponse>(categoryDataResponse);

  return (
    <>
      <div className="flex flex-col md:flex-row items-start gap-8">
        <aside className="w-full md:w-3/12">
          <h1 className="text-2xl font-bold mb-4 font-heading">My Builds</h1>

          <div className="mb-8">
            <AddNewBuild />
          </div>

          {!myBuilds ? (
            <div className="text-red-600 brutalist-style p-2">
              Failed to load builds.
            </div>
          ) : myBuilds.length === 0 ? (
            <div className="brutalist-style p-2">
              You have no builds yet, please create one.
            </div>
          ) : (
            <div className="flex flex-col gap-2 brutalist-style p-2">
              <h1 className="font-heading font-bold">Saved Builds</h1>

              {myBuilds.map((myBuild) => (
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
                  <h1 className="text-2xl font-bold font-heading">
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
