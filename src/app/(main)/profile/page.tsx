import Link from "next/link";
export default async function Profile() {
  return (
    <>
      <h1 className="text-2xl font-bold">Profile</h1>
      <div>
        <Link href="/profile/my-builds">My Builds</Link>
      </div>
    </>
  );
}
