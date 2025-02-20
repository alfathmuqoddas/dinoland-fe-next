"use client";
import Link from "next/link";
import { useActionState } from "react";
import { LogIn } from "lucide-react";
import { login } from "@/actions/loginActions";

const Login = () => {
  const initialState = {
    accessToken: "",
    refreshToken: "",
  };

  const [state, loginAction, isPending] = useActionState(login, null);

  return (
    <div className="max-w-md mx-auto px-4 mt-16">
      <div className="brutalist-card">
        <div className="absolute -top-8 -left-8 bg-yellow-400 p-4 border-4 border-black">
          <LogIn className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-bold my-4">Login</h2>
        <form className="flex flex-col gap-4" action={loginAction}>
          <div>
            <label className="block font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="brutalist-input"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label className="block font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="brutalist-input"
              placeholder="password"
            />
          </div>
          <button
            type="submit"
            className="brutalist-button w-full"
            disabled={isPending}
          >
            {isPending ? "Logging in..." : "LOGIN"}
          </button>
          <div>{state?.error && state.error}</div>
        </form>
        <p className="mt-6 text-center">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="text-pink-500 font-bold hover:underline"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
