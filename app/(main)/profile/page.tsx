"use client";

import Image from "next/image";
import { useState } from "react";
import useSWR, { mutate } from "swr";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
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
  Loader2,
  MoreVertical,
  Pencil,
  Trash,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { DialogClose } from "@radix-ui/react-dialog";

// SWR fetcher function
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ProfilePage() {
  const { data: session } = useSession();
  const [editData, setEditData] = useState({
    title: "",
    description: "",
  });
  const user = session?.user;
  const loadingUser = !user;

  const { data, isLoading: loadingProjects } = useSWR(
    "/api/project/profile",
    fetcher
  );

  const projects = data?.userProjects || [];

  const handleEdit = (project: { title: string; description: string }) => {
    setEditData({
      title: project.title,
      description: project.description,
    });
  };

  const saveEdit = async (id: string) => {
    try {
      const res = await fetch(`/api/project/profile/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editData),
      });

      if (res.ok) {
        mutate("/api/project/profile");
        setEditData({ title: "", description: "" }); // Reset edit form
      }
    } catch (err) {
      console.error(err);
    }
  };


  const deleteProject = async (projectId: string) => {
    try {
      const res = await fetch(`/api/project/profile/${projectId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
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
    <section className="w-full min-h-screen pt-20 pb-28 px-4 sm:px-6 bg-[var(--background)] text-[var(--foreground)]">
      <div className="max-w-4xl lg:max-w-5xl mx-auto px-6 space-y-16">
        {/* Avatar + Profile Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 items-start gap-12">
          {/* Avatar */}
          <div className="lg:order-2 flex justify-center lg:justify-end">
            <div className="relative group transition-transform">
              {loadingUser ? (
                <Skeleton className="h-44 w-44 sm:h-48 sm:w-48 rounded-full relative z-10" />
              ) : (
                <Avatar className="h-44 w-44 sm:h-48 sm:w-48 rounded-full relative border border-border shadow-2xl shadow-zinc-800 dark:shadow-zinc-900">
                  <AvatarImage
                    src={user?.image || ""}
                    alt={user?.name || ""}
                    className="object-cover"
                  />
                  <AvatarFallback className="text-2xl font-bold bg-muted">
                    RP
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col gap-6 text-center lg:text-left lg:items-start">
            <div>
              {loadingUser ? (
                <>
                  <Skeleton className="h-8 w-48 sm:w-64 mb-2 mx-auto lg:mx-0" />
                  <Skeleton className="h-6 w-64 sm:w-80 mx-auto lg:mx-0" />
                </>
              ) : (
                <>
                  <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                    {user?.name}
                  </h1>
                  <p className="text-lg sm:text-xl font-medium text-zinc-500 dark:text-zinc-400">
                    {user?.email}
                  </p>
                </>
              )}
            </div>

            {/* Badges */}
            {loadingUser ? (
              <>
                <Skeleton className="h-10 w-24 mx-auto lg:mx-0 px-4 items-center gap-2" />
                <Skeleton className="h-6 w-48 mx-auto lg:mx-0" />
              </>
            ) : (
              <>
                <Badge className="w-fit mx-auto lg:mx-0 px-4 py-1.5 text-base rounded-full bg-primary/90 text-white shadow-md flex items-center gap-2 hover:scale-105 transition-transform">
                  <span>💻</span> Fullstack Dev
                </Badge>

                <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-xl leading-relaxed mx-auto lg:mx-0">
                  Suka ngoding, ngopi, dan explore hal baru ✨. Mengembangkan
                  ide jadi nyata lewat code & kolaborasi.
                </p>
              </>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="flex justify-around border-b pb-6 text-center text-zinc-700 dark:text-zinc-300">
          <div>
            <p className="text-3xl font-bold">{projects.length}</p>
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

        {/* Projects */}
        <div className="flex flex-col gap-10">
          {loadingProjects ? (
            <div className="w-full flex justify-center items-center">
              <Loader2 className="animate-spin" />
            </div>
          ) : projects.length > 0 ? (
            projects.map(
              (
                project: {
                  _id: string;
                  title: string;
                  description: string;
                  image: string;
                },
                i: number
              ) => (
                <div
                  key={i}
                  className="relative flex flex-col sm:flex-row gap-5 p-6 rounded-2xl border border-border bg-background cursor-pointer hover:shadow-md transition-shadow duration-300"
                >
                  {/* Titik tiga */}
                  <div className="absolute top-4 right-4 z-20">
                    <DropdownMenu>
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
                            <form className="space-y-4">
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
                                onClick={() => saveEdit(project._id)}
                                disabled={
                                  !editData.title || !editData.description
                                }
                              >
                                Save Changes
                              </button>
                            </DialogClose>
                          </DialogContent>
                        </Dialog>

                        <DropdownMenuItem
                          onClick={() => deleteProject(project._id)}
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
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="font-semibold text-lg">
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

                    {project.image && (
                      <div className="mt-2 rounded-xl overflow-hidden border border-border transition-transform">
                        <Image
                          src={project.image}
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
      </div>
    </section>
  );
}
