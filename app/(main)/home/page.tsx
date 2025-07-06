"use client";
import { useSession } from "next-auth/react";
import useSWR from "swr";

import FeedProject from "@/components/home/feedProject";
import ProfileSidebar from "@/components/home/profileSidebar";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Homepage() {
  const { data: session } = useSession();
  const user = session?.user;

  const { data, isLoading: loadingProjects } = useSWR("/api/project", fetcher, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
    revalidateOnReconnect: false,
  });

  if (loadingProjects) {
    return (
      <section className="w-full min-h-screen pt-6 pb-20 bg-[var(--background)] text-[var(--foreground)]">
        <div className="max-w-6xl mx-auto px-4 flex flex-col lg:flex-row gap-10">
          {/* Skeleton for feed area */}
          <div className="w-full flex flex-col gap-6">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="relative flex flex-col sm:flex-row gap-5 p-6 border-b border-border animate-pulse"
              >
                {/* Avatar Skeleton */}
                <div className="h-14 w-14 rounded-full bg-muted mt-1" />

                {/* Content Skeleton */}
                <div className="flex flex-col w-full gap-3">
                  <div className="space-y-1">
                    <div className="h-4 w-32 bg-muted rounded" />
                    <div className="h-3 w-24 bg-muted rounded" />
                  </div>

                  <div className="h-5 w-3/4 bg-muted rounded" />
                  <div className="h-4 w-full bg-muted rounded" />
                  <div className="h-4 w-5/6 bg-muted rounded" />

                  <div className="mt-2 h-48 w-full bg-muted rounded-xl" />

                  <div className="mt-3 flex items-center gap-8 text-muted-foreground text-base">
                    <div className="h-5 w-16 bg-muted rounded" />
                    <div className="h-5 w-16 bg-muted rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar skeleton */}
          <div className="hidden lg:block md:w-1/3 max-w-sm sticky top-6 self-start bg-card border border-[var(--border)] rounded-2xl p-6 shadow-lg animate-pulse">
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-muted rounded-full mb-4" />
              <div className="h-4 w-32 bg-muted rounded mb-2" />
              <div className="h-3 w-24 bg-muted rounded mb-4" />
              <div className="h-3 w-3/4 bg-muted rounded mb-2" />
              <div className="h-3 w-2/3 bg-muted rounded mb-6" />

              <div className="grid grid-cols-3 gap-4 w-full text-sm text-[var(--foreground)] mb-6">
                <div className="h-10 bg-muted rounded" />
                <div className="h-10 bg-muted rounded" />
                <div className="h-10 bg-muted rounded" />
              </div>

              <div className="h-9 w-full bg-muted rounded-xl mb-3" />
              <div className="h-9 w-full bg-muted rounded-xl" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  const publicProjects = data?.projects || [];
  console.log("publicProjects", publicProjects);

  return (
    <section className="w-full min-h-screen pt-6 pb-20 bg-[var(--background)] text-[var(--foreground)]">
      <div className="max-w-6xl mx-auto px-4 flex flex-col lg:flex-row gap-10">
        {/* Feed Area */}
        <FeedProject publicProjects={publicProjects} />

        {/* Profile Sidebar */}
        {/*  */}
        <ProfileSidebar
          user={
            user
              ? {
                  name: user.name ?? undefined,
                  email: user.email ?? undefined,
                  image: user.image ?? undefined,
                }
              : null
          }
        />
      </div>
    </section>
  );
}
