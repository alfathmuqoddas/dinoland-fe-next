import { fetchWithAuth, safeJson } from "@/lib/secureFetch";
import Link from "next/link";
import { AddNewBuild } from "@/components/Dialog/AddMyBuild";
import type { TMyBuildResponse } from "@/type/build";
import { redirect } from "next/navigation";

export default async function MyBuilds() {
  const myBuildsRes = await fetchWithAuth(
    `${process.env.BASE_API_URL}/my-build`,
  );

  if (!myBuildsRes.ok) {
    if (myBuildsRes.status === 401) {
      redirect("/login");
    }
    return (
      <div className="p-4 text-red-600">
        <h2 className="font-bold text-xl mb-2">Failed to load data</h2>
        <p>Please refresh the page or try again later.</p>
      </div>
    );
  }

  const { data: myBuilds } = await safeJson<TMyBuildResponse>(myBuildsRes);

  return (
    <>
      <div className="flex flex-col md:flex-row items-start gap-8">
        <aside className="w-full">
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
                  href={`/profile/my-builds/${myBuild.id}`}
                  key={myBuild.id}
                  className="hover:underline cursor-pointer"
                >
                  {myBuild.name}
                </Link>
              ))}
            </div>
          )}
        </aside>
      </div>
    </>
  );
}
