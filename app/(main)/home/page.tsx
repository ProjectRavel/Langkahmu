"use client";

import Image from "next/image";

const publicProjects = [
  {
    id: 1,
    title: "Langkah Awal",
    image: "/thumb1.png",
    author: "Ravels",
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
    <section className="w-full bg-background pt-6 pb-24 mt-6">
      <div className="max-w-6xl mx-auto px-4">
        {/* Project Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {publicProjects.map((project) => (
            <div
              key={project.id}
              className="bg-muted overflow-hidden hover:shadow-md cursor-pointer transition-all"
            >
              <div className="relative w-full aspect-square">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-3">
                <h3 className="text-sm font-medium text-foreground truncate">
                  {project.title}
                </h3>
                <p className="text-xs text-muted-foreground truncate">
                  oleh {project.author}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
