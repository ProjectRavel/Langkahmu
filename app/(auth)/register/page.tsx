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
    <div className="min-h-screen flex items-center justify-center px-4 bg-[var(--background)]">
      <div className="flex flex-col-reverse md:flex-row w-full max-w-6xl rounded-2xl overflow-hidden shadow-lg border border-[var(--border)] bg-card backdrop-blur-md">
        {/* Left - Illustration */}
        <div className="hidden md:flex w-1/2 bg-muted items-center justify-center">
          <div className="w-full h-full relative">
            <Image
              src="/join-banner.png"
              alt="Login Illustration"
              fill
              className="object-cover h-full w-full"
              priority
            />
          </div>
        </div>
        {/* Right - Form */}
        <div className="w-full md:w-1/2 p-10">
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold text-foreground">
              Create your{" "}
              <span className="text-[var(--primary)]">Langkahmu</span> account
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Let&apos;s start your new journey.
            </p>
          </div>

          {error && (
            <div className="mb-4 text-sm bg-destructive/10 text-destructive border border-destructive px-4 py-3 rounded-md flex items-center gap-2 animate-fadeIn">
              <svg
                className="w-5 h-5"
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
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border border-[var(--border)] bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                placeholder="e.g. username"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border border-[var(--border)] bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                placeholder="you@example.com"
              />
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-muted-foreground mb-1">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 pr-12 rounded-lg border border-[var(--border)] bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute top-9 right-4 text-muted-foreground hover:text-[var(--primary)]"
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-white bg-[var(--primary)] hover:opacity-90 disabled:opacity-70"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <div className="my-4 flex items-center justify-center gap-3 text-sm text-muted-foreground">
            <span className="w-20 h-px bg-[var(--border)]"></span>
            or
            <span className="w-20 h-px bg-[var(--border)]"></span>
          </div>

          <button
            onClick={() => signIn("google", { callbackUrl: "/home" })}
            disabled={loading}
            className="w-full py-3 px-4 rounded-lg border border-[var(--border)] bg-background text-foreground flex items-center justify-center gap-2 hover:border-[var(--primary)]"
          >
            <FcGoogle className="w-5 h-5" /> Sign up with Google
          </button>

          <p className="mt-6 text-xs text-center text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className="underline hover:text-[var(--primary)]"
            >
              Sign in
            </Link>
          </p>

          <p className="mt-3 text-[10px] text-center text-muted-foreground">
            By signing up, you agree to our <br />
            <span className="underline hover:text-[var(--primary)]">
              Terms of Service
            </span>{" "}
            and{" "}
            <span className="underline hover:text-[var(--primary)]">
              Privacy Policy
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
