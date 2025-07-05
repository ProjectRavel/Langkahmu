import { connectDB } from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import Project from "@/models/Project";

export async function GET() {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    const userId = session.user.id;
    const userProjects = await Project.find({ userId }).sort({ createdAt: -1 });

    if (!userProjects || userProjects.length === 0) {
      return Response.json({ userProjects: [] }, { status: 200 });
    }

    return NextResponse.json({ userProjects }, { status: 200 });
  } catch (error) {
    console.error("Error in GET /api/project/user:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
