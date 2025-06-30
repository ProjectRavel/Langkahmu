import { connectDB } from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Project from "@/models/Project";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);
    console.log("Session:", session);
    if (!session || !session.user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    const { userId, title, description, images } = await request.json();
    const project = new Project({ userId, title, description, images });

    await project.save();

    return NextResponse.json(
      { message: "Project created successfully", project },
      { status: 200 }
    );
    
  } catch (error) {
    console.error("Error in POST /api/auth/project/create:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
