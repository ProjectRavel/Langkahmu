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
      const timer = setTimeout(() => setError(""), 4000);
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
 
  <div className="min-h-screen flex items-center justify-center px-4 bg-background transition-colors duration-300">
    <div className="w-full max-w-5xl flex overflow-hidden bg-card border border-border rounded-3xl">
      {/* Left Banner */}
      <div className="hidden md:flex w-1/2 bg-muted items-center justify-center">
          <Image
            src="/banner.png"
            alt="Login Illustration"
            width={600}
            height={700}
            className="object-contain h-full"
            priority
          />
      </div>

      {/* Right Form */}
      <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-foreground tracking-tight">
            Welcome to <span className="text-primary">Langkahmu</span>
          </h1>
          <p className="text-sm text-muted-foreground mt-2">
            Start your journey again
          </p>
        </div>

        {error && (
          <div className="mb-4 text-sm text-destructive bg-destructive/10 px-4 py-2 rounded-lg border border-destructive">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              required
              placeholder="you@example.com"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-border bg-accent text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-sm font-medium text-foreground mb-1">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              required
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 pr-12 rounded-xl border border-border bg-accent text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-9 right-4 text-muted-foreground hover:text-primary cursor-pointer transition"
            >
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-primary text-white flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-60 transition cursor-pointer"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6 text-sm text-muted-foreground gap-2">
          <span className="flex-grow h-px bg-border" />
          or continue with
          <span className="flex-grow h-px bg-border" />
        </div>

        {/* Google Sign In */}
        <button
          onClick={() => signIn("google", { callbackUrl: "/home" })}
          disabled={loading}
          className="w-full py-3 rounded-xl border border-border flex items-center justify-center gap-3 hover:border-primary cursor-pointer transition"
        >
          <FcGoogle size={20} />
          Sign in with Google
        </button>

        {/* Register link */}
        <p className="text-xs text-center mt-6 text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="underline hover:text-primary">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  </div>
);

}
