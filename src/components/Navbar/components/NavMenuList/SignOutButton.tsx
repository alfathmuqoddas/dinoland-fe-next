"use client";
import { signOut } from "@/actions/signOutActions";
import { LogOut } from "lucide-react";

export default function SignOutButton() {
  //handlesignout add confirmation
  const handleSignOut = () => {
    if (confirm("Are you sure you want to sign out?")) {
      signOut();
    } else {
      return;
    }
  };
  return (
    <button
      onClick={handleSignOut}
      type="submit"
      className="flex items-center space-x-1 px-2 py-1 text-white text-sm font-bold transition-colors hover:bg-pink-600"
    >
      <LogOut className="w-5 h-5" />
      Sign Out
    </button>
  );
}
