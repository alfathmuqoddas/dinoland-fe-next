import { cookies } from "next/headers";
import Link from "next/link";
import { logout } from "../lib/session";

export const Auth = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  return (
    <>
      {token ? (
        <div onClick={() => logout()}>Logout</div>
      ) : (
        <Link href="/login">Login</Link>
      )}
    </>
  );
};

export default Auth;
