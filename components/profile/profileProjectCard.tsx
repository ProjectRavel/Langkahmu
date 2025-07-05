import Image from "next/image";
import { useState } from "react";
import { mutate } from "swr";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Heart,
  MessageCircle,
  MoreVertical,
  Pencil,
  Trash,
} from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { DialogClose } from "@radix-ui/react-dialog";
import { Skeleton } from "../ui/skeleton";
import { toast } from "sonner";

export default function ProjectCard({
  projects: projects,
  loading: loadingProjects,
  user: user,
}: {
  projects: {
    _id: string;
    title: string;
    description: string;
    images?: { url: string; publicId: string }[];
  }[];
  loading: boolean;
  user: { name?: string; email?: string; image?: string } | null;
}) {
  const [editData, setEditData] = useState({
    title: "",
    description: "",
  });

  const handleEdit = (project: { title: string; description: string }) => {
    setEditData({
      title: project.title,
      description: project.description,
    });
  };

  const handleEditProject = async (id: string) => {
    try {
      const res = await fetch(`/api/project/profile/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editData),
      });

      if (!res.ok) {
        throw new Error("Failed to update project");
      }

      // Optimistically update cache
      await mutate("/api/project/profile");
      setEditData({ title: "", description: "" });

      // Optional: show success toast
      toast.success("Project updated!");

      // Reset form
      setEditData({ title: "", description: "" });
    } catch (err) {
      console.error("Edit error:", err);
      toast.error("Failed to update project");
    }
  };

  const handleDeleteProject = async (projectId: string, publicId: string) => {
    try {
      const res = await fetch(`/api/project/profile/${projectId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ publicId }),
      });

      if (res.ok) {
        mutate("/api/project/profile"); // Refetch updated list
      } else {
        console.error("Failed to delete project");
      }
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  return (
    <div className="flex flex-col gap-10">
      {loadingProjects ? (
        <div className="flex flex-col gap-6">
          {[...Array(2)].map((_, i) => (
            <div
              key={i}
              className="flex flex-col sm:flex-row gap-5 p-6 rounded-2xl border border-border bg-card"
            >
              {/* Avatar Skeleton */}
              <Skeleton className="h-14 w-14 rounded-full" />

              {/* Content Skeleton */}
              <div className="flex flex-col w-full gap-3">
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-48" />
                </div>

                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-64 w-full rounded-xl" />

                <div className="flex gap-6 mt-3">
                  <Skeleton className="h-5 w-20" />
                  <Skeleton className="h-5 w-20" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : projects.length > 0 ? (
        projects.map(
          (
            project: {
              _id: string;
              title: string;
              description: string;
              images?: { url: string; publicId: string }[];
            },
            i: number
          ) => (
            <div
              key={i}
              className="relative flex flex-col sm:flex-row gap-5 p-6 rounded-2xl border border-border bg-card cursor-pointer hover:shadow-md transition-shadow duration-300"
            >
              {/* Titik tiga */}
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

                  <DropdownMenuContent
                    align="end"
                    className="w-36 shadow-lg animate-in fade-in slide-in-from-top-2"
                  >
                    <Dialog>
                      <DialogTrigger asChild>
                        <DropdownMenuItem
                          className="flex items-center gap-2 cursor-pointer"
                          onSelect={(e) => {
                            e.preventDefault();
                            handleEdit(project);
                          }}
                        >
                          <Pencil className="w-4 h-4 text-muted-foreground" />
                          Edit
                        </DropdownMenuItem>
                      </DialogTrigger>

                      <DialogContent className="max-w-lg">
                        <DialogHeader>
                          <DialogTitle>Edit Project</DialogTitle>
                          <DialogDescription>
                            Update your project details here.
                          </DialogDescription>
                        </DialogHeader>
                        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                          <input
                            type="text"
                            placeholder="Project Title"
                            className="w-full p-2 border rounded"
                            value={editData.title}
                            onChange={(e) =>
                              setEditData({
                                ...editData,
                                title: e.target.value,
                              })
                            }
                          />
                          <textarea
                            placeholder="Project Description"
                            className="w-full p-2 border rounded"
                            value={editData.description}
                            onChange={(e) =>
                              setEditData({
                                ...editData,
                                description: e.target.value,
                              })
                            }
                          />

                          {/* Add more fields as needed */}
                        </form>
                        <DialogClose asChild>
                          <button
                            type="button"
                            className="px-4 py-2 bg-primary text-white rounded-2xl hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={() => handleEditProject(project._id)}
                            disabled={!editData.title || !editData.description}
                          >
                            Save Changes
                          </button>
                        </DialogClose>
                      </DialogContent>
                    </Dialog>

                    <DropdownMenuItem
                      onClick={() =>
                        handleDeleteProject(
                          project._id,
                          project.images?.[0]?.publicId || ""
                        )
                      }
                      className="flex items-center gap-2 cursor-pointer text-red-600 focus:text-red-600"
                    >
                      <Trash className="w-4 h-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Avatar + Content */}
              <Avatar className="h-14 w-14 mt-1">
                <AvatarImage src={user?.image || ""} />
                <AvatarFallback>RP</AvatarFallback>
              </Avatar>

              <div className="flex flex-col w-full gap-3">
                <div className="items-center gap-2">
                  <h2 className="font-semibold text-lg text-foreground">
                    {user?.name || "User"}
                  </h2>
                  <span className="text-base text-muted-foreground">
                    {user?.email || "User"}
                  </span>
                </div>

                <h3 className="text-xl font-semibold">{project.title}</h3>
                <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {project.description || "No description provided."}
                </p>

                {project.images?.[0]?.url && (
                  <div className="mt-2 rounded-xl overflow-hidden border border-border transition-transform">
                    <Image
                      src={project.images[0].url}
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
        )
      ) : (
        <div className="text-center text-zinc-500 dark:text-zinc-400">
          No projects found.
        </div>
      )}
    </div>
  );
}
