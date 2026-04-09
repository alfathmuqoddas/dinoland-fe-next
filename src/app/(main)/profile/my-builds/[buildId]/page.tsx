import { fetchWithAuth, safeJson } from "@/lib/secureFetch";
import BuildItemByCategory from "@/components/Table/BuildItemTable";
import RemoveMyBuild from "@/components/Buttons/RemoveMyBuild";
import { EditMyBuild } from "@/components/Dialog/EditMyBuild";
import type {
  TMyBuildDetailResponse,
  TMyBuildItemResponse,
} from "@/type/build";
import { TProductCategoryResponse } from "@/type/category";
import { redirect } from "next/navigation";

export default async function MyBuilds({
  params,
}: {
  params: Promise<{ buildId: string }>;
}) {
  const { buildId } = await params;

  const baseURL = process.env.BASE_API_URL;

  const [categoryDataResponse, myBuildDetailsResponse, myBuildItemsResponse] =
    await Promise.all([
      fetchWithAuth(`${baseURL}/productCategory`),
      fetchWithAuth(`${baseURL}/my-build/${buildId}`),
      fetchWithAuth(`${baseURL}/my-build-item/${buildId}`),
    ]);

  const responses = [
    myBuildDetailsResponse,
    myBuildItemsResponse,
    categoryDataResponse,
  ];

  if (responses.some((res) => res?.status === 401)) {
    redirect("/login");
  }

  if (responses.some((res) => !res?.ok)) {
    return (
      <div className="p-4 text-red-600">
        <h2 className="font-bold text-xl mb-2">Failed to load data</h2>
        <p>Please refresh the page or try again later.</p>
      </div>
    );
  }

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
        <section className="w-full">
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
