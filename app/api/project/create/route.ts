import { connectDB } from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Project from "@/models/Project";
import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function POST(req: Request) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    const formData = await req.formData();
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const userId = formData.get("userId") as string;
    const image = formData.get("image") as File | null;

    let imageData = null;

    // Upload ke Cloudinary jika ada gambar
    if (image && image.size > 0) {
      const arrayBuffer = await image.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      interface CloudinaryUploadResult {
        secure_url: string;
        public_id: string;
        [key: string]: unknown;
      }

      const uploadRes: CloudinaryUploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "project-images" }, (err, result) => {
            if (err) return reject(err);
            resolve(result as CloudinaryUploadResult);
          })
          .end(buffer);
      });

      imageData = {
        url: uploadRes.secure_url,
        publicId: uploadRes.public_id,
      };
    }

    const project = new Project({
      userId,
      title,
      description,
      images: imageData,
    });

    await project.save();

    return NextResponse.json(
      { message: "Project created successfully", project },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in POST /api/project/create:", error);
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      {
        status: 500,
      }
    );
  }
}