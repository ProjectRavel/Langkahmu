"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";

import {
  Calendar,
  Home,
  Search,
  Settings,
  User,
  LogOut,
  X,
  ImagePlus,
} from "lucide-react";

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { mutate } from "swr";

export function AppSidebar() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setloading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const { data: session } = useSession();
  const pathname = usePathname();
  const user = session?.user;
  const router = useRouter();

  const items = useMemo(
    () => [
      { title: "Home", url: "/home", icon: Home },
      { title: "Todo's", url: "/todos", icon: Calendar },
      { title: "Search", url: "/search", icon: Search },
      { title: "Profile", url: "/profile", icon: User },
      { title: "Settings", url: "/settings", icon: Settings },
    ],
    []
  );

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  console.log(title, desc);

  if (!hasMounted) {
    return <div className="w-[240px] bg-muted animate-pulse h-screen" />;
  }

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    setloading(true);

    try {
      const formData = new FormData();
      if (image) formData.append("image", image); // tidak perlu `as Blob` jika sudah File
      formData.append("title", title);
      formData.append("description", desc);
      formData.append("userId", session?.user.id || "");

      const res = await fetch("/api/project/create", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Failed to create project");
      }

      await mutate("/api/project/profile");

      setloading(false);
      setIsOpen(false);
      setTitle("");
      setDesc("");
      setImage(null);
    } catch (error) {
      console.error("Error creating project:", error);
      setloading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setImage(null);
      setPreviewUrl(null);
    }
  };

  return (
    <Sidebar variant="sidebar" className="bg-white border-r shadow-sm">
      <SidebarHeader className="justify-center mt-4 mx-auto">
        <span className="font-bold text-2xl">Langkahmu</span>
      </SidebarHeader>
      <SidebarContent className="mt-6">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {items.map((item) => {
                const isActive = pathname === item.url;
                const buttonClasses = clsx(
                  "flex items-center gap-3 w-full px-4 py-2 text-base rounded-full transition-all hover:bg-muted hover:text-foreground cursor-pointer duration-150",
                  {
                    "text-foreground font-semibold": isActive,
                    "text-muted-foreground": !isActive,
                  }
                );

                return (
                  <SidebarMenuItem key={item.title}>
                    <Link href={item.url}>
                      <SidebarMenuButton
                        size="default"
                        className={buttonClasses}
                      >
                        <item.icon className="w-5 h-5" />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                );
              })}

              <SidebarMenuItem>
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full h-10 flex justify-center items-center gap-2 cursor-pointer">
                      <span className="text-sm font-medium leading-none">
                        Create
                      </span>
                    </Button>
                  </DialogTrigger>

                  <DialogContent className="sm:max-w-3xl">
                    <DialogHeader>
                      <DialogTitle>Create New Post</DialogTitle>
                      <DialogDescription>
                        Share your idea, Project, or anything with the world!
                      </DialogDescription>
                    </DialogHeader>
                    <form
                      onSubmit={handleCreatePost}
                      className="grid gap-6 grid-cols-1 lg:grid-cols-2 items-start"
                    >
                      <div className="relative w-full h-64 bg-muted/50 border border-dashed rounded-xl overflow-hidden animate-in fade-in duration-200">
                        {previewUrl ? (
                          <>
                            <Image
                              src={previewUrl}
                              alt="Preview"
                              width={300}
                              height={300}
                              className="object-cover w-full h-full rounded-xl"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                setImage(null);
                                setPreviewUrl(null);
                                if (fileInputRef.current) {
                                  fileInputRef.current.value = "";
                                }
                              }}
                              className="absolute top-2 right-2 bg-background/60 backdrop-blur border border-border rounded-full p-1 hover:bg-background cursor-pointer duration-200 transition"
                              title="Remove Image"
                            >
                              <X size={16} />
                            </button>
                          </>
                        ) : (
                          <label
                            htmlFor="fileUpload"
                            className="flex flex-col items-center justify-center w-full h-full text-center text-muted-foreground space-y-2 cursor-pointer hover:bg-muted/70 transition"
                          >
                            <ImagePlus size={32} />
                            <p className="text-sm font-medium">
                              No image selected
                            </p>
                            <p className="text-xs">Click to upload an image</p>
                          </label>
                        )}
                      </div>

                      {/* Form Input */}
                      <div className="space-y-4 w-full">
                        <Input
                          className="w-full"
                          placeholder="Title"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          required
                        />
                        <Textarea
                          className="w-full"
                          placeholder="Your thoughts"
                          value={desc}
                          onChange={(e) => setDesc(e.target.value)}
                          rows={4}
                          required
                        />

                        {/* Custom File Upload Button */}
                        <div className="flex items-center gap-4">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            ref={fileInputRef}
                            className="hidden"
                            id="fileUpload"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => fileInputRef.current?.click()}
                            className="flex items-center cursor-pointer hover:text-foreground gap-2"
                          >
                            <ImagePlus size={16} />
                            {image ? "Change Image" : "Choose Image"}
                          </Button>
                          {image && (
                            <span className="text-sm text-muted-foreground truncate max-w-[200px]">
                              {image.name}
                            </span>
                          )}
                        </div>

                        <div className="flex justify-end">
                          <Button
                            type="submit"
                            disabled={loading}
                            className="w-full cursor-pointer"
                          >
                            {loading ? "Publishing..." : "Publish"}
                          </Button>
                        </div>
                      </div>
                    </form>
                  </DialogContent>

                </Dialog>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="px-4 py-4 border-t border-border bg-muted/40">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="w-full flex items-center gap-3 px-3 py-2 hover:bg-muted rounded-lg transition-all duration-150">
              <div className="relative">
                <Avatar className="h-10 w-10 ring-1 ring-ring/20">
                  <AvatarImage src={user?.image || ""} alt={user?.name || ""} />
                  <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-emerald-500 rounded-full border-2 border-background" />
              </div>
              <div className="flex flex-col items-start justify-center overflow-hidden">
                <span className="text-sm font-semibold truncate">
                  {user?.name}
                </span>
                <span className="text-xs text-muted-foreground truncate">
                  {user?.email}
                </span>
              </div>
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent side="top" align="end" className="w-56 mb-2">
            <DropdownMenuLabel className="text-xs">
              Signed in as
            </DropdownMenuLabel>
            <div className="px-3 pb-2 text-sm font-medium truncate">
              rafaelsumanti01@gmail.com
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push("/profile")}>
              <User className="w-4 h-4 mr-2" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/settings")}>
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-red-500 hover:text-red-600"
              onClick={() => signOut({ callbackUrl: "/login" })}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
