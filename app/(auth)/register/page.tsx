"use client";
import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Loader2 } from "lucide-react";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.body.style.background = "var(--background)";
    return () => {
      document.body.style.background = "";
    };
  }, []);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Registration failed");

      await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      router.push("/home");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 ">
      <div className="flex w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl border border-[var(--border)] bg-white/10 dark:bg-zinc-900/10 backdrop-blur-md">
        {/* Left Image */}
        <div className="hidden md:flex w-1/2 items-center justify-center p-8 animate-float">
          <Image
            width={400}
            height={400}
            src="/join_banner.svg"
            alt="Register Image"
            className="max-w-full h-auto object-contain drop-shadow-2xl"
          />
        </div>

        {/* Right Form */}
        <div className="w-full md:w-1/2 p-8">
          <h1 className="text-4xl font-bold mb-4 text-center text-zinc-900 dark:text-white">
            Join And Start with{" "}
            <span className="text-[var(--primary)]">Langkahmu</span>
          </h1>
          <p className="text-sm text-[var(--muted-foreground)] mb-6 text-center">
            Create an account to start your journey.
          </p>

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

          <form onSubmit={handleRegister} className="space-y-5">
            <div>
              <label className="block text-sm mb-1 text-zinc-700 dark:text-zinc-300">
                Username
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                placeholder="Enter your username"
              />
            </div>

            <div>
              <label className="block text-sm mb-1 text-zinc-700 dark:text-zinc-300">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                placeholder="Enter your email"
              />
            </div>

            <div className="relative">
              <label className="block text-sm mb-1 text-zinc-700 dark:text-zinc-300">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 pr-12 rounded-xl border border-[var(--border)] bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                placeholder="••••••"
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
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[var(--primary)] text-white rounded-xl transition hover:opacity-90 disabled:opacity-70 cursor-pointer"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {loading ? "Creating Account..." : "Sign Up"}
            </button>
          </form>

          <div className="my-4 flex items-center justify-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
            <span className="w-16 h-px bg-[var(--border)]"></span>
            or
            <span className="w-16 h-px bg-[var(--border)]"></span>
          </div>

          <button
            onClick={() => signIn("google", { callbackUrl: "/home" })}
            className="w-full py-3 px-4 border border-[var(--border)] rounded-xl flex items-center justify-center gap-3 text-zinc-800 cursor-pointer dark:text-white bg-white dark:bg-zinc-900 hover:border-[var(--primary)] hover:text-white transition"
            disabled={loading}
          >
            <FcGoogle className="w-5 h-5" />
            Sign up with Google
          </button>

          <div className="mt-4 text-xs text-center text-zinc-400 dark:text-zinc-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="underline hover:text-[var(--primary)]"
            >
              Sign in
            </Link>
          </div>

          <div className="mt-6 text-xs text-center text-zinc-400 dark:text-zinc-500">
            By signing up, you agree to our <br />
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
