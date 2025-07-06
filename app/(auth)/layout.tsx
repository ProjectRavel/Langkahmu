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
    <div className="justify-center bg-background">
      {children}
    </div>
    </ThemeProvider>
  );
}
