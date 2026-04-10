"use client";
import { signOutAction as signOut } from "@/features/auth/actions";
import { LogOut } from "lucide-react";
import { useTransition } from "react";

export default function SignOutButton() {
  const [isPending, startTransition] = useTransition();

  const handleSignOut = async () => {
    if (!confirm("Are you sure you want to sign out?")) return;
    startTransition(async () => {
      const result = await signOut();
      if (result?.success === false) {
        alert(result.message);
      }
    });
  };

  return (
    <button
      onClick={handleSignOut}
      disabled={isPending}
      type="submit"
      className="flex items-center space-x-1 px-2 py-1 text-white text-sm font-bold transition-colors hover:bg-pink-600"
    >
      <LogOut className="w-5 h-5" />
      Sign Out
    </button>
  );
}
