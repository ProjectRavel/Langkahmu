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
import Image from "next/image";
export default function FeedProject({
  publicProjects,
}: {
  publicProjects: {
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
  }[];
}) {
  return (
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
  );
}
