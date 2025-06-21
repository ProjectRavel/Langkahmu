"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { FiEye, FiEyeOff } from "react-icons/fi"; // Ikon mata buka/tutup
import Link from "next/link";

export default function LoginPage() {
  useEffect(() => {
    document.body.style.background = "var(--background)";
    return () => {
      document.body.style.background = "";
    };
  }, []);

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="flex w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl border border-[var(--border)] bg-white/10 dark:bg-zinc-900/10 backdrop-blur-md">
        {/* Left Side - Floating Image */}
        <div className="hidden md:flex w-1/2 items-center justify-center p-8 animate-float">
          <Image
            width={400}
            height={400}
            src="/banner.svg"
            alt="Welcome Image"
            className="max-w-full h-auto object-contain drop-shadow-2xl"
          />
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full md:w-1/2 p-8">
          <h1 className="text-4xl font-bold mb-4 text-center text-zinc-900 dark:text-white">
            Welcome to <span className="text-[var(--primary)]">Langkahmu</span>
          </h1>
          <p className="text-sm text-[var(--muted-foreground)] mb-6 text-center">
            Sign in to continue your journey.
          </p>

          <form className="space-y-5">
            <div>
              <label className="block text-sm text-zinc-700 dark:text-zinc-300 mb-1">
                Username
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                placeholder="Enter your username"
              />
            </div>

            <div className="relative">
              <label className="block text-sm text-zinc-700 dark:text-zinc-300 mb-1">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-3 pr-12 rounded-xl border border-[var(--border)] bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute cursor-pointer top-9 right-4 text-zinc-500 dark:text-zinc-400 hover:text-[var(--primary)]"
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 cursor-pointer bg-[var(--primary)] text-white rounded-xl hover:opacity-90 transition duration-300 ease-in-out"
            >
              Login
            </button>
          </form>

          <div className="my-4 flex items-center justify-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
            <span className="w-16 h-px bg-[var(--border)]"></span>
            or
            <span className="w-16 h-px bg-[var(--border)]"></span>
          </div>

          <button className="w-full py-3 px-4 border cursor-pointer border-[var(--border)] rounded-xl flex items-center justify-center gap-3 text-zinc-800 dark:text-white bg-white dark:bg-zinc-900 hover:border-[var(--primary)] hover:text-white transition duration-300 ease-in-out">
            <FcGoogle className="w-5 h-5" />
            Sign in with Google
          </button>

          <div className="mt-4 text-xs text-center text-zinc-400 dark:text-zinc-500">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="underline cursor-pointer hover:text-[var(--primary)] transition"
            >
              Sign up
            </Link>
          </div>

          <div className="mt-6 text-xs text-center text-zinc-400 dark:text-zinc-500">
            By signing in, you agree to our <br />
            <span className="underline cursor-pointer hover:text-[var(--primary)] transition">
              Terms of Service
            </span>{" "}
            and{" "}
            <span className="underline cursor-pointer hover:text-[var(--primary)] transition">
              Privacy Policy
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}