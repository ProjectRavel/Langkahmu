"use client";

import { useState } from "react";
import Image from "next/image";
import { Loader2, UploadCloud } from "lucide-react";

export default function UploadPage() {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!image) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("file", image);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setUrl(data.url);
      } else {
        console.error("Upload failed:", data.error);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-card rounded-2xl shadow-xl p-6 space-y-5">
        <h1 className="text-2xl font-semibold text-center text-foreground">
          Upload Gambar
        </h1>

        <label className="w-full cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-border p-6 rounded-xl hover:bg-border transition">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          {preview ? (
            <Image
              src={preview}
              alt="Preview"
              width={200}
              height={200}
              className="rounded-xl"
            />
          ) : (
            <>
              <UploadCloud className="w-12 h-12 text-muted-foreground" />
              <p className="mt-2 text-sm text-muted-foreground">
                Klik untuk memilih gambar
              </p>
            </>
          )}
        </label>

        <button
          onClick={handleUpload}
          disabled={!image || loading}
          className={`w-full flex items-center justify-center gap-2 px-4 py-2 text-white font-medium rounded-xl transition ${
            loading || !image
              ? "bg-primary/30 cursor-not-allowed"
              : "bg-primary hover:bg-primary/80"
          }`}
        >
          {loading ? (
            <Loader2 className="animate-spin w-   h-5" />
          ) : (
            <UploadCloud className="w-5 h-5" />
          )}
          {loading ? "Mengunggah..." : "Upload"}
        </button>

        {url && (
          <div className="space-y-2 text-center">
            <p className="text-sm text-gray-600">Berhasil diunggah:</p>
            <Image
              src={url}
              alt="Uploaded"
              width={200}
              height={200}
              className="mx-auto rounded-xl"
            />
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 text-sm underline break-all"
            >
              {url}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
