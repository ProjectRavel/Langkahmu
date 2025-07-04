import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Project from "@/models/Project";
import cloudinary from "@/lib/cloudinary";

// Type Context agar konsisten & clean

// DELETE handler
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const body = await req.json();
  const { publicId } = body;

  try {
    await connectDB();
    const deletedProject = await Project.findByIdAndDelete(id);
    if (deletedProject && publicId) {
      await cloudinary.uploader.destroy(publicId);
    }

    if (!deletedProject) {
      return NextResponse.json(
        { message: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json(
      { message: "Server error", error },
      { status: 500 }
    );
  }
}

// PUT handler
export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params; // Menunggu resolusi dari Promise params

  try {
    await connectDB();
    const updateData = await req.json();

    const updatedProject = await Project.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedProject) {
      return NextResponse.json(
        { message: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedProject);
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json(
      { message: "Server error", error },
      { status: 500 }
    );
  }
}
