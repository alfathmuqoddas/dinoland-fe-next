"use client";
import Link from "next/link";
import { useActionState, useEffect } from "react";
import { LogIn } from "lucide-react";
import { loginAction as login } from "@/features/auth/actions";

const Login = () => {
  const [_state, loginAction, isPending] = useActionState(login, {
    success: false,
    message: "",
    errors: {},
  });

  useEffect(() => {
    if (_state?.message) {
      if (_state.success) {
        alert(_state.message);
      } else {
        alert(_state.message);
      }
    }
  }, [_state]);

  return (
    <div className="max-w-md mx-auto px-4 mt-16">
      <div className="brutalist-card">
        <div className="p-4">
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
    </div>
  );
};

export default Login;
