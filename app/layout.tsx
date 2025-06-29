import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import SessionWrapper from "@/components/sessionWrapper"; // client wrapper

import "./globals.css";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "App Root",
  description: "Root layout",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[var(--background)]`}
      >
        <SessionWrapper>
          <ThemeProvider attribute="class" defaultTheme="system">
            {children}
            <Toaster
              position="top-center"
              theme="system" // ✅ ini diperbolehkan
              toastOptions={{
                classNames: {
                  toast: "text-base md:text-lg px-6 py-5 rounded-xl shadow-xl",
                  title: "text-lg",
                  description: "text-sm",
                  icon: "text-2xl md:text-3xl md:mr-4 mr-2 md:mb-0 mb-2 md:mt-0 mt-2",
                },
              }}
            />
          </ThemeProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}
