import { useState, useRef, useEffect } from "react";
import { mutate } from "swr";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { X, ImagePlus } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function SidebarFormPost() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setloading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { data: session } = useSession();
  const pathname = usePathname();
  const router = useRouter();

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
      setPreviewUrl(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      if (pathname !== "/profile") {
        router.push("/profile");
      }
      router.refresh();
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

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full h-10 flex justify-center items-center gap-2 cursor-pointer">
          <span className="text-sm font-medium leading-none">Create</span>
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
                <p className="text-sm font-medium">No image selected</p>
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
  );
}
