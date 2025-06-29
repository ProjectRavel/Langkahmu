"use client";

import Image from "next/image";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle } from "lucide-react";
import { useSession } from "next-auth/react";

export default function ProfilePage() {
  const {data: session} = useSession();
  const user = session?.user;



  const projects = [
    {
      title: "ProjectPKL",
      desc: "Aplikasi pencatatan dan showcase proyek untuk siswa SMK.",
      image: "/project-pkl.png",
    },
    {
      title: "Langkahmu",
      desc: "Platform komunitas untuk anak muda membagikan perjalanan hidup.",
      image: "/langkahmu-preview.png",
    },
  ];

  return (
    <section className="w-full min-h-screen pt-20 pb-28 px-4 sm:px-6 bg-[var(--background)] text-[var(--foreground)]">
      <div className="max-w-4xl lg:max-w-5xl mx-auto px-6 space-y-16">

        {/* Avatar + Profile Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 items-start gap-12">
          {/* Avatar */}
          <div className="lg:order-2 flex justify-center lg:justify-end">
            <div className="relative group transition-transform">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-primary to-purple-500 blur opacity-25 group-hover:opacity-40 transition"></div>
              <Avatar className="h-44 w-44 sm:h-48 sm:w-48 rounded-full border-4 border-muted shadow-lg relative z-10">
                <AvatarImage src={user?.image || ""} alt={user?.name || ""} className="object-cover" />
                <AvatarFallback className="text-2xl font-bold bg-muted">
                  RP
                </AvatarFallback>
              </Avatar>
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col gap-6 text-center lg:text-left lg:items-start">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                {user?.name}
              </h1>
              <p className="text-lg sm:text-xl font-medium text-zinc-500 dark:text-zinc-400">
                {user?.email}
              </p>
            </div>

            <Badge className="w-fit mx-auto lg:mx-0 px-4 py-1.5 text-base rounded-full bg-primary/90 text-white shadow-md flex items-center gap-2 hover:scale-105 transition-transform">
              <span>💻</span> Fullstack Dev
            </Badge>

            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-xl leading-relaxed mx-auto lg:mx-0">
              Suka ngoding, ngopi, dan explore hal baru ✨. Mengembangkan ide
              jadi nyata lewat code & kolaborasi.
            </p>
          </div>
        </div>

        {/* STATS */}
        <div className="flex justify-around border-b pb-6 text-center text-zinc-700 dark:text-zinc-300">
          <div>
            <p className="text-3xl font-bold">3</p>
            <p className="text-sm mt-1">Projects</p>
          </div>
          <div>
            <p className="text-3xl font-bold">14</p>
            <p className="text-sm mt-1">Posts</p>
          </div>
          <div>
            <p className="text-3xl font-bold">10</p>
            <p className="text-sm mt-1">Teams</p>
          </div>
        </div>

        {/* PROJECTS */}
        <div className="flex flex-col gap-10">

          {projects.map((project, i) => (
            <div
              key={i}
              className="flex flex-col sm:flex-row gap-5 p-6 rounded-2xl border border-border bg-background cursor-pointer hover:shadow-md transition-shadow duration-300"
            >
              <Avatar className="h-14 w-14 mt-1">
                <AvatarImage src="/profile.png" />
                <AvatarFallback>RP</AvatarFallback>
              </Avatar>

              <div className="flex flex-col w-full gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="font-semibold text-lg">ravels</h2>
                  <span className="text-base text-muted-foreground">
                    @rafaelpandu
                  </span>
                </div>

                <h3 className="text-xl font-semibold">{project.title}</h3>
                <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {project.desc}
                </p>

                {project.image && (
                  <div className="mt-2 rounded-xl overflow-hidden border border-border transition-transform">
                    <Image
                      src="/thumb2.png"
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
          ))}
        </div>
      </div>
    </section>
  );
}
