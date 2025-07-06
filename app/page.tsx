"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { FcGoogle } from "react-icons/fc";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function RegisterPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");

  const [errors, setErrors] = useState<{
    username?: string;
    email?: string;
    password?: string;
  }>({});

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!username.trim()) newErrors.username = "Username is required.";
    if (!email.trim()) newErrors.email = "Email is required.";
    else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email))
      newErrors.email = "Please enter a valid email.";
    if (!password.trim()) newErrors.password = "Password is required.";
    else if (password.length < 6) newErrors.password = "At least 6 characters.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      toast.warning("Please complete the form first");
      return;
    }

    setLoading(true);
    setLoadingText("Creating account...");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed.");

      toast.success("Account created successfully. Redirecting...");
      setLoadingText("Redirecting to login...");
      setTimeout(() => router.push("/login"), 2000);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Registration failed.";
      toast.error(`Registration failed: ${errorMessage}`);
    } finally {
      setLoading(false);
      setLoadingText("");
    }
  };

  useEffect(() => {
    document.body.style.background = "var(--background)";
    return () => {
      document.body.style.background = "";
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[var(--background)]">
      <div className="flex flex-col-reverse md:flex-row w-full max-w-6xl rounded-2xl overflow-hidden shadow-lg border border-[var(--border)] bg-card backdrop-blur-md">
        {/* Left Banner */}
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

        {/* Right Form */}
        <div className="w-full md:w-1/2 p-10">
          <h1 className="text-3xl font-semibold text-center text-zinc-800 dark:text-white">
            Create your <span className="text-[var(--primary)]">Langkahmu</span>{" "}
            account
          </h1>
          <p className="text-sm text-center text-muted-foreground mb-6">
            Begin your creative journey
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              />
              {errors.username && (
                <p className="text-sm text-red-500 mt-1">{errors.username}</p>
              )}
            </div>

            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">{errors.email}</p>
              )}
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 pr-12 rounded-xl border border-[var(--border)] bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-muted-foreground"
              >
                {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
              </button>
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 mt-2 rounded-xl text-white font-medium transition flex items-center justify-center gap-2 ${
                loading
                  ? "bg-[var(--primary)] opacity-80 cursor-not-allowed"
                  : "bg-[var(--primary)] hover:opacity-90"
              }`}
            >
              {loading && <Loader2 className="w-5 h-5 animate-spin" />}
              {loading ? loadingText : "Create Account"}
            </button>
          </form>

          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-[var(--border)]" />
            <span className="mx-4 text-sm text-muted-foreground">or</span>
            <div className="flex-grow border-t border-[var(--border)]" />
          </div>

          <button
            onClick={() => {
              setLoading(true);
              setLoadingText("Redirecting to Google...");
              signIn("google", { callbackUrl: "/home" });
            }}
            disabled={loading}
            className="w-full py-3 px-4 rounded-xl border border-[var(--border)] bg-white dark:bg-zinc-900 text-zinc-800 dark:text-white flex items-center justify-center gap-3 hover:border-[var(--primary)] transition"
          >
            <FcGoogle className="w-5 h-5" />
            Sign up with Google
          </button>

          <p className="mt-6 text-sm text-center text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className="underline hover:text-[var(--primary)] transition"
            >
              Log in
            </Link>
          </p>

          <p className="mt-2 text-xs text-center text-muted-foreground">
            By signing up, you agree to our{" "}
            <Link
              href="/privacy-policy"
              className="underline hover:text-[var(--primary)]"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
