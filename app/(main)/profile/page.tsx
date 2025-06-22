"use client";

import Image from "next/image";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle } from "lucide-react";

export default function ProfilePage() {
  return (
    <section className="w-full min-h-screen pt-16 pb-20 bg-[var(--background)] text-[var(--foreground)]">
      <div className="max-w-6xl mx-auto px-6">
        {/* PROFILE */}
        <div className="grid grid-cols-1 lg:flex lg:justify-between items-start gap-12">
          {/* Info Kiri */}
          <div className="flex flex-col gap-4 text-center lg:text-left">
            <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight leading-tight">
              ravels
            </h1>

            <Badge className="w-fit mx-auto lg:mx-0 px-4 py-1.5 text-base rounded-full bg-primary/90 text-white shadow-md">
              Fullstack Dev
            </Badge>

            <p className="text-lg sm:text-xl font-medium text-muted-foreground">
              @rafaelpandu
            </p>

            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-xl leading-relaxed mx-auto lg:mx-0">
              Suka ngoding, ngopi, dan explore hal baru ✨. Mengembangkan ide
              jadi nyata lewat code & kolaborasi.
            </p>
          </div>

          {/* Avatar Kanan */}
          <div className="self-center lg:self-start relative group">
            <Avatar className="h-44 w-44 sm:h-48 sm:w-48 rounded-full border-4 border-muted shadow-lg transition-transform group-hover:scale-105">
              <AvatarImage src="/profile.png" />
              <AvatarFallback className="text-2xl font-bold bg-muted">
                RP
              </AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* STATS */}
        <div className="mt-12 flex justify-between border-b pb-6 text-center text-zinc-700 dark:text-zinc-300">
          <div className="flex-1">
            <p className="text-3xl font-bold">3</p>
            <p className="text-sm">Projects</p>
          </div>
          <div className="flex-1">
            <p className="text-3xl font-bold">14</p>
            <p className="text-sm">Posts</p>
          </div>
          <div className="flex-1">
            <p className="text-3xl font-bold">10</p>
            <p className="text-sm">Teams</p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-6">
          {[
            {
              image: "/thumb1.png",
              title: "ProjectPKL",
              desc: "Website manajemen proyek PKL lengkap dengan todo list, kontribusi, dan autentikasi Google.",
            },
            {
              image: "/thumb1.png",
              title: "Langkahmu",
              desc: "Platform komunitas untuk anak muda berbagi cerita & kolaborasi kreatif.",
            },
            {
              image: "/thumb1.png",
              title: "Netflix Clone",
              desc: "Website streaming UI dengan API OMDB dan tampilan interaktif seperti Netflix.",
            },
          ].map((project, i) => (
            <div
              key={i}
              className="flex gap-4 p-6 rounded-2xl border-b border-border cursor-pointer"
            >
              {/* Avatar */}
              <Avatar className="h-14 w-14 mt-1">
                <AvatarImage src="/profile.png" />
                <AvatarFallback>RP</AvatarFallback>
              </Avatar>

              {/* Content */}
              <div className="flex flex-col w-full">
                {/* Header */}
                <div className="flex items-center gap-2">
                  <h2 className="font-semibold text-lg">ravels</h2>
                  <span className="text-base text-muted-foreground">
                    @rafaelpandu
                  </span>
                </div>

                {/* Judul & Deskripsi */}
                <h3 className="text-xl font-semibold mt-1">{project.title}</h3>
                <p className="text-base text-muted-foreground mt-2 leading-relaxed">
                  {project.desc}
                </p>

                {/* Gambar Project */}
                {project.image && (
                  <div className="mt-4 rounded-xl overflow-hidden border border-border">
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={600}
                      height={300}
                      className="w-full object-cover"
                    />
                  </div>
                )}

                {/* Actions */}
                <div className="mt-4 flex items-center gap-8 text-muted-foreground text-base">
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
