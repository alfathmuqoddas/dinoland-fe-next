import { fetchWithAuth } from "@/lib/secureFetch";
import { TMyBuildItem, TProductCategory } from "@/lib/type/product";
import Link from "next/link";

const BuildItemByCategory = ({
  categoryData,
  data,
}: {
  categoryData: TProductCategory[];
  data: TMyBuildItem[];
}) => {
  const productNamesByCategory = data.reduce<
    Record<number, { name: string; price: number }>
  >((acc, { product: { categoryId, name, price } }) => {
    acc[categoryId] = { name, price };
    return acc;
  }, {});

  const selectFromData = (id: number) => productNamesByCategory[id];

  return (
    <div>
      {categoryData.map((category) => {
        const product = selectFromData(category.id);
        return (
          <div key={category.id}>
            {category.name} :{" "}
            {product ? (
              <>
                {product.name} - ${product.price}
              </>
            ) : (
              "Not Available"
            )}
          </div>
        );
      })}
    </div>
  );
};

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
      <div className="flex flex-col md:flex-row gap-4 items-start">
        <div className="flex flex-col gap-2 md:w-1/6 border-2 border-black rounded-xl text-gray-900 p-2 bg-white">
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
        {buildId ? (
          <div className="w-full md:w-5/6 flex flex-col gap-2">
            <BuildItemByCategory
              data={myBuildItems}
              categoryData={categoryData}
            />
          </div>
        ) : (
          <div className="w-full md:w-5/6">No build selected</div>
        )}
      </div>
    </>
  );
}
