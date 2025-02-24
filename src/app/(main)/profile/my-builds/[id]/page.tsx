export default async function MyBuildsItems({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <div>My Builds Items {id}</div>;
}
