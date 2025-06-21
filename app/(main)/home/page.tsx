"use client";

import Image from "next/image";

const publicProjects = [
  {
    id: 1,
    title: "Langkah Awal",
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
  {
    id: 5,
    title: "Langkah Awal",
    image: "/thumb1.png",
    author: "Ravels",
  },
  {
    id: 6,
    title: "Kolaborasi Komunitas",
    image: "/thumb1.png",
    author: "Winda",
  },
  {
    id: 7,
    title: "Perjalanan Kreatif",
    image: "/thumb1.png",
    author: "Dimas",
  },
  {
    id: 8,
    title: "Cerita Pribadi",
    image: "/thumb1.png",
    author: "Ghifa",
  },
];

export default function Homepage() {
  return (
    <section className="w-full bg-background pt-5 pb-28">
      <div className="max-w-4xl mx-auto px-4 ">
        {/* Grid of Projects */}
        <div className="max-w-md mx-auto px-4 flex flex-col gap-8">
  {publicProjects.map((project) => (
    <div
      key={project.id}
      className=" border  rounded-md overflow-hidden shadow-md hover:shadow-xl transition cursor-pointer"
    >
      <div className="relative w-full aspect-square">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 400px"
          priority
        />
      </div>
      <div className="flex items-center gap-3 px-4 pt-4">
        <div className="w-9 h-9 rounded-full bg-blue-400 flex items-center justify-center text-base font-bold text-white shadow">
          {project.author[0]}
        </div>
        <span className="text-sm font-semibold text-white">{project.author}</span>
      </div>
      <div className="px-4 pt-2 pb-1">
        <h3 className="text-lg font-bold text-white mb-1">{project.title}</h3>
        <p className="text-sm text-gray-600 mb-2">
          {project.description || "Deskripsi tidak tersedia."}
        </p>
      </div>
      <div className="px-4 pb-2 flex items-center gap-6 text-gray-500 text-sm border-t pt-2">
        <button className="flex items-center gap-1 hover:text-primary transition">
          {/* Read more */}
          <a href="#">Read more &rarr;</a>
        </button>
      </div>
    </div>
  ))}
</div>
      </div>
    </section>
  );
}
