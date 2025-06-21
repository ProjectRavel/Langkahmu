"use client";
import { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { HiEye, HiEyeOff } from "react-icons/hi";
import Link from "next/link";
import Image from "next/image";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    document.body.style.background = "var(--background)";
    return () => {
      document.body.style.background = "";
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="flex w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl border border-[var(--border)] bg-white/10 dark:bg-zinc-900/10 backdrop-blur-md">
        {/* Left Side - Floating Image */}
        <div className="hidden md:flex w-1/2 items-center justify-center p-8 animate-float">
          <Image
            src="/your-image.png" // Ganti dengan gambar kamu
            width={400}
            height={400}
            alt="Floating Illustration"
            className="max-w-full h-auto object-contain drop-shadow-2xl"
          />
        </div>

        {/* Right Side - Register Form */}
        <div className="w-full md:w-1/2 p-8">
          <h1 className="text-3xl font-bold mb-2 text-center text-zinc-900 dark:text-white">
            Create your <span className="text-[var(--primary)]">Langkahmu</span>{" "}
            account
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6 text-center">
            Begin your creative journey
          </p>

          <form className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
            />

            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full px-4 py-3 pr-12 rounded-xl border border-[var(--border)] bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 cursor-pointer flex items-center text-zinc-500 dark:text-zinc-400"
              >
                {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 mt-2 bg-[var(--primary)] cursor-pointer text-white rounded-xl hover:opacity-90 transition"
            >
              Create Account
            </button>
          </form>

          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-[var(--border)]"></div>
            <span className="mx-4 text-sm text-zinc-500">or</span>
            <div className="flex-grow border-t border-[var(--border)]"></div>
          </div>

          <button className="w-full py-3 px-4 cursor-pointer border border-[var(--border)] rounded-xl flex items-center justify-center gap-3 text-zinc-800 dark:text-white bg-white dark:bg-zinc-900 hover:border-[var(--primary)] hover:text-white transition duration-300 ease-in-out">
            <FcGoogle className="w-5 h-5" />
            Sign up with Google
          </button>

          <p className="mt-6 text-sm text-center text-zinc-600 dark:text-zinc-400">
            Already have an account?{" "}
            <Link
              href="/login"
              className="underline hover:text-[var(--primary)] transition"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
