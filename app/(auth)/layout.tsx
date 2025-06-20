"use client";
import "@/app/globals.css";
import { ThemeProvider } from "@/components/theme-provider";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system">
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
      {children}
    </div>
    </ThemeProvider>
  );
}
