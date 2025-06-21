"use client";
import Image from "next/image";

const publicProjects = [
  {
    id: 1,
    title: "Langkah Awals",
    image: "/thumb1.png",
    author: "Ravels",
    description:
      "Proyek ini adalah langkah awal dalam perjalanan kreatif saya, di mana saya mengeksplorasi ide-ide baru dan mengembangkan keterampilan saya.",
  },
  {
    id: 2,
    title: "Kolaborasi Komunitas",
    image: "/thumb1.png",
    author: "Winda",
  },
  {
    id: 3,
    title: "Perjalanan Kreatif",
    image: "/thumb1.png",
    author: "Dimas",
  },
  {
    id: 4,
    title: "Cerita Pribadi",
    image: "/thumb1.png",
    author: "Ghifa",
  },
];

export default function Homepage() {
  return (
    <section className="w-full min-h-screen pt-6 pb-20 bg-[var(--background)] text-[var(--foreground)]">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row gap-10">
        {/* Feed Area */}
        <div className="w-full md:w-2/3 flex flex-col gap-8">
          {publicProjects.map((project) => (
            <div
              key={project.id}
              className="bg-gradient-to-br from-[var(--background)] to-[var(--background)] dark:from-[var(--background)] dark:to-[var(--background)]  border border-[var(--border)] rounded-2xl overflow-hidden shadow-md hover:shadow-[var(--primary)]/10 transition-all group"
            >
              <div className="relative w-full aspect-video">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-500"
                  sizes="(max-width: 768px) 100vw, 400px"
                  priority
                />
              </div>
              <div className="px-5 pt-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--primary)] flex items-center justify-center text-white font-semibold shadow">
                  {project.author[0]}
                </div>
                <span className="text-sm font-medium">{project.author}</span>
              </div>
              <div className="px-5 pt-2 pb-4">
                <h3 className="text-xl font-semibold">{project.title}</h3>
                <p className="text-sm text-[var(--foreground)]/50 leading-relaxed">
                  {project.description || "Deskripsi tidak tersedia."}
                </p>
              </div>
              <div className="px-5 py-3 border-t border-[var(--border)] text-sm text-[var(--primary)] hover:underline hover:text-blue-500 transition">
                <a href="#">Read more →</a>
              </div>
            </div>
          ))}
        </div>

        {/* Profile Sidebar */}
        <div className="w-full md:w-1/3 max-w-sm sticky top-6 self-start bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-6 shadow-lg">
          <div className="flex flex-col items-center text-center">
            <div className="relative w-24 h-24 mb-4">
              <Image
                src="/profile.png"
                alt="Profile"
                fill
                className="rounded-full object-cover border border-white/20 shadow-md"
              />
            </div>
            <h2 className="text-lg font-bold truncate w-full">
              Rafael Pandu Sumanti
            </h2>
            <p className="text-sm text-[var(--foreground)] mb-1">Bogor, West Java</p>
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
            <button className="w-full border border-dashed border-[var(--primary)] text-[var(--primary)] rounded-xl py-2 hover:bg-[var(--primary)] hover:text-white transition text-sm font-medium mb-3">
              + Create New Post
            </button>
            <button className="w-full bg-[var(--primary)] hover:bg-blue-700 text-white rounded-xl py-2 transition text-sm font-medium">
              View My Projects
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
