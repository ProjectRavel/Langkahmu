"use client";

import useSWR from "swr";
import ProfileInfo from "@/components/profile/profileInfo";
import ProjectCard from "@/components/profile/profileProjectCard";
import ProfileStats from "@/components/profile/profileStats";

import { useSession } from "next-auth/react";
// SWR fetcher function
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ProfilePage() {
  const { data: session } = useSession();

  const user = session?.user;
  const loadingUser = !user;

  const { data, isLoading: loadingProjects } = useSWR(
    "/api/project/profile",
    fetcher
  );

  const projects = data?.userProjects || [];

  return (
    <section className="w-full min-h-screen pt-20 pb-28 px-4 sm:px-6 bg-[var(--background)] text-[var(--foreground)]">
      <div className="max-w-4xl lg:max-w-5xl mx-auto px-6 space-y-16">
        {/* Avatar + Profile Info */}
        <ProfileInfo
          user={
            user
              ? {
                  name: user.name ?? undefined,
                  email: user.email ?? undefined,
                  image: user.image ?? undefined,
                }
              : null
          }
          loadingUser={loadingUser}
        />

        {/* Stats */}
        <ProfileStats projects={projects || []} loading={loadingProjects} />

        {/* Projects */}
        <ProjectCard
          projects={projects}
          loading={loadingProjects}
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
