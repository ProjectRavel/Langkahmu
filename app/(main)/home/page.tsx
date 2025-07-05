"use client";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoreVertical,
  Pencil,
  Trash,
  Heart,
  MessageCircle,
} from "lucide-react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Homepage() {
  const { data: session } = useSession();
  const user = session?.user;

  const { data, isLoading: loadingProjects } = useSWR(
    "/api/project",
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      revalidateOnReconnect: false,
    }
  );

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
        <div className="w-full flex flex-col gap-6">
          {publicProjects.map(
            (project: {
              _id: string;
              title: string;
              description: string;
              images: { url: string; publicId: string }[];
              userId: {
                _id: string;
                name?: string;
                username?: string;
                image?: string;
              } | null;
            }) => (
              <div
                key={project._id}
                className="relative flex flex-col sm:flex-row gap-5 p-6 border-b border-border cursor-pointer hover:shadow-md transition-shadow duration-300"
              >
                {/* Dropdown Edit/Delete */}
                <div className="absolute top-4 right-4 z-20">
                  <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                      <button
                        className="p-2 rounded-full hover:bg-accent transition-colors"
                        aria-label="Open menu"
                      >
                        <MoreVertical className="w-4 h-4 text-muted-foreground" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-40">
                      <DropdownMenuItem className="flex items-center gap-2">
                        <Pencil className="w-4 h-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center gap-2 text-red-500 hover:bg-red-50">
                        <Trash className="w-4 h-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Avatar */}
                <Avatar className="h-14 w-14 mt-1">
                  <Image
                    src={project.userId?.image || "/profile.png"}
                    alt={project.userId?.name || "User"}
                    width={56}
                    height={56}
                    className="rounded-full object-cover"
                  />
                  <AvatarFallback>
                    {project.userId?.name?.[0]?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>

                {/* Konten */}
                <div className="flex flex-col w-full gap-3">
                  <div className="items-center gap-2">
                    <h2 className="font-semibold text-lg text-foreground">
                      {project.userId?.name || "User"}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      @{project.userId?.username || "username"}
                    </p>
                  </div>

                  <h3 className="text-xl font-semibold">{project.title}</h3>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {project.description || "No description provided."}
                  </p>

                  {project.images && (
                    <div className="mt-2 rounded-xl overflow-hidden border border-border transition-transform">
                      <Image
                        src={project.images[0].url || "/profile.png"}
                        alt={project.title}
                        width={600}
                        height={300}
                        className="w-full object-cover"
                      />
                    </div>
                  )}

                  <div className="mt-3 flex items-center gap-8 text-muted-foreground text-base">
                    <button className="flex items-center gap-2 hover:text-red-500 cursor-pointer transition">
                      <Heart className="w-5 h-5" />
                      <span>45</span>
                    </button>
                    <button className="flex items-center gap-2 hover:text-primary cursor-pointer transition">
                      <MessageCircle className="w-5 h-5" />
                      <span>3</span>
                    </button>
                  </div>
                </div>
              </div>
            )
          )}
        </div>

        {/* Profile Sidebar */}
        <div className="hidden lg:block lg:w-1/3 max-w-sm sticky top-6 self-start bg-card border border-[var(--border)] rounded-2xl p-6 shadow-lg">
          <div className="flex flex-col items-center text-center">
            <div className="relative w-24 h-24 mb-4">
              <Image
                src={user?.image || "/profile.png"}
                alt="Profile"
                fill
                className="rounded-full object-cover border border-white/20 shadow-md"
              />
            </div>
            <h2 className="text-lg font-bold truncate w-full">
              {user?.name || "John Doe"}
            </h2>
            <span className="bg-[var(--primary)] text-white text-xs font-semibold px-2 py-1 rounded-full mb-2">
              Fullstack Developer
            </span>
            <p className="text-sm text-[var(--foreground)]/50 mb-4 leading-relaxed">
              Passionate about youth projects, collaboration, and design. Let’s
              build something great together!
            </p>
            <div className="grid grid-cols-3 gap-4 w-full text-sm text-[var(--foreground)] mb-6">
              <div className="text-center">
                <p className="font-bold text-[var(--foreground)]">12</p>
                <p>Projects</p>
              </div>
              <div className="text-center">
                <p className="font-bold text-[var(--foreground)]">5</p>
                <p>Posts</p>
              </div>
              <div className="text-center">
                <p className="font-bold text-[var(--foreground)]">3</p>
                <p>Teams</p>
              </div>
            </div>
            <button className="w-full border border-dashed border-[var(--primary)] text-[var(--primary)] rounded-xl py-2 cursor-pointer hover:bg-[var(--primary)] hover:text-white transition text-sm font-medium mb-3">
              + Create New Post
            </button>
            <Link
              href="/profile"
              className="w-full bg-[var(--primary)] hover:bg-[var(--primary)]/80 cursor-pointer text-white rounded-xl py-2 transition text-sm font-medium"
            >
              View My Projects
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
