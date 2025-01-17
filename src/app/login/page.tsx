import Link from "next/link";
import { LogIn } from "lucide-react";

const Login = () => {
  return (
    <div className="max-w-md mx-auto mt-16">
      <div className="brutalist-card">
        <div className="absolute -top-8 -left-8 bg-yellow-400 p-4 border-4 border-black">
          <LogIn className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-bold mb-8 mt-4">Login</h2>
        <form className="space-y-6">
          <div>
            <label className="block font-bold mb-2">Email</label>
            <input
              type="email"
              className="brutalist-input"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label className="block font-bold mb-2">Password</label>
            <input
              type="password"
              className="brutalist-input"
              placeholder="••••••••"
            />
          </div>
          <button type="submit" className="brutalist-button w-full">
            LOGIN
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
  );
};

export default Login;
