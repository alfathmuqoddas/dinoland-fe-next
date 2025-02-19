"use client";
import Link from "next/link";
import { useActionState } from "react";
import { UserPlus } from "lucide-react";
import { register } from "@/actions/userRegisterActions";

const Register = () => {
  const [state, registerAction, isPending] = useActionState(register, null);

  return (
    <div className="max-w-md mx-auto px-4 mt-16">
      <div className="brutalist-card">
        <div className="absolute -top-8 -left-8 bg-yellow-400 p-4 border-4 border-black">
          <UserPlus className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-bold mb-8 mt-4">Register</h2>
        <form className="space-y-4" action={registerAction}>
          <div>
            <label className="block font-bold mb-2">Full Name</label>
            <input
              type="text"
              className="brutalist-input"
              placeholder="John Doe"
              id="registerName"
              name="name"
            />
          </div>
          <div>
            <label className="block font-bold mb-2">Email</label>
            <input
              type="email"
              className="brutalist-input"
              placeholder="your@email.com"
              id="registerEmail"
              name="email"
            />
          </div>
          <div>
            <label className="block font-bold mb-2">Password</label>
            <input
              type="password"
              className="brutalist-input"
              placeholder="••••••••"
              id="registerPassword"
              name="password"
            />
          </div>
          <div>
            <label className="block font-bold mb-2">Confirm Password</label>
            <input
              type="password"
              className="brutalist-input"
              placeholder="••••••••"
              id="registerConfirmPassword"
              name="confirmPassword"
            />
          </div>
          <button type="submit" className="brutalist-button w-full">
            {isPending ? "Loading..." : "REGISTER"}
          </button>
          {state && <p>{state}</p>}
        </form>
        <p className="mt-6 text-center">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-pink-500 font-bold hover:underline"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
