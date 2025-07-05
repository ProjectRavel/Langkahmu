import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { BottomNav } from "@/components/ui/bottomNav";
import { Toaster } from "sonner";
import "@/app/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Main App",
  description: "Your app description",
};

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[var(--background)]`}
      >
        <ThemeProvider attribute="class" defaultTheme="system">
          <SidebarProvider>
            {/* Desktop Sidebar */}
            <div className="hidden md:block fixed top-0 left-0 h-full w-64 z-40">
              <AppSidebar />
            </div>

            {/* Main content area */}
            <main className="md:ml-64 pb-20 w-full">{children}</main>

            {/* Mobile Bottom Navigation */}
            <BottomNav />
          </SidebarProvider>
          {/* Toast notifications */}
          <Toaster
            theme="system"
            position="top-right"
            toastOptions={{
              className:
                "bg-white dark:bg-zinc-900 border border-border text-sm text-zinc-900 dark:text-zinc-100 rounded-xl shadow-lg px-4 py-3",
              duration: 3000,
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
