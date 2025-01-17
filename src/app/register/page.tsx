import Link from "next/link";
import { UserPlus } from "lucide-react";

const Register = () => {
  return (
    <div className="max-w-md mx-auto mt-16">
      <div className="brutalist-card">
        <div className="absolute -top-8 -left-8 bg-yellow-400 p-4 border-4 border-black">
          <UserPlus className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-bold mb-8 mt-4">Register</h2>
        <form className="space-y-6">
          <div>
            <label className="block font-bold mb-2">Full Name</label>
            <input
              type="text"
              className="brutalist-input"
              placeholder="John Doe"
            />
          </div>
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
          <div>
            <label className="block font-bold mb-2">Confirm Password</label>
            <input
              type="password"
              className="brutalist-input"
              placeholder="••••••••"
            />
          </div>
          <button type="submit" className="brutalist-button w-full">
            CREATE ACCOUNT
          </button>
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
