import { signOut } from "@/actions/signOutActions";
import { LogOut } from "lucide-react";

export default async function SignOutButton() {
  return (
    <form action={signOut}>
      <button
        type="submit"
        className="flex items-center space-x-1 px-2 py-1 text-white text-sm font-bold transition-colors hover:bg-pink-600"
      >
        <LogOut className="w-5 h-5" />
        Sign Out
      </button>
    </form>
  );
}
