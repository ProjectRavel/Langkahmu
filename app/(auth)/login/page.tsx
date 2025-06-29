"use client";
import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Link from "next/link";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    document.body.style.background = "var(--background)";
    return () => {
      document.body.style.background = "";
    };
  }, []);

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    if (res?.error) {
      setError("Invalid email or password.");
      setLoading(false);
    } else {
      router.push("/home");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="flex w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl border border-[var(--border)] bg-white/10 dark:bg-zinc-900/10 backdrop-blur-md">
        {/* Left Image */}
        <div className="hidden md:flex w-1/2 items-center justify-center p-8 animate-float">
          <Image
            width={400}
            height={400}
            src="/banner.svg"
            alt="Welcome Image"
            className="max-w-full h-auto object-contain drop-shadow-2xl"
          />
        </div>

        {/* Right Form */}
        <div className="w-full md:w-1/2 p-8">
          <h1 className="text-4xl font-bold mb-4 text-center text-zinc-900 dark:text-white">
            Welcome to <span className="text-[var(--primary)]">Langkahmu</span>
          </h1>
          <p className="text-sm text-[var(--muted-foreground)] mb-6 text-center">
            Sign in to continue your journey.
          </p>

          {/* Error Toast */}
          {error && (
            <div className="mb-4 animate-fadeIn max-w-md mx-auto px-4 py-3 border border-destructive text-destructive bg-destructive/10 rounded-md text-sm flex items-center gap-2">
              <svg
                className="w-5 h-5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8v4m0 4h.01M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"
                />
              </svg>
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm mb-1 text-zinc-700 dark:text-zinc-300">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Password */}
            <div className="relative">
              <label className="block text-sm mb-1 text-zinc-700 dark:text-zinc-300">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 pr-12 rounded-xl border border-[var(--border)] bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute top-9 right-4 text-zinc-500 dark:text-zinc-400 hover:text-[var(--primary)]"
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[var(--primary)] text-white rounded-xl transition hover:opacity-90 disabled:opacity-70 cursor-pointer"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* OR Divider */}
          <div className="my-4 flex items-center justify-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
            <span className="w-16 h-px bg-[var(--border)]"></span>
            or
            <span className="w-16 h-px bg-[var(--border)]"></span>
          </div>

          {/* Google Button */}
          <button
            onClick={() => signIn("google", { callbackUrl: "/home" })}
            className="w-full py-3 px-4 border border-[var(--border)] rounded-xl flex items-center justify-center gap-3 text-zinc-800 cursor-pointer dark:text-white bg-white dark:bg-zinc-900 hover:border-[var(--primary)] hover:text-white transition"
            disabled={loading}
          >
            <FcGoogle className="w-5 h-5" />
            Sign in with Google
          </button>

          {/* Register Link */}
          <div className="mt-4 text-xs text-center text-zinc-400 dark:text-zinc-500">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="underline hover:text-[var(--primary)]"
            >
              Sign up
            </Link>
          </div>

          {/* Terms */}
          <div className="mt-6 text-xs text-center text-zinc-400 dark:text-zinc-500">
            By signing in, you agree to our <br />
            <span className="underline hover:text-[var(--primary)]">
              Terms of Service
            </span>{" "}
            and{" "}
            <span className="underline hover:text-[var(--primary)]">
              Privacy Policy
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
