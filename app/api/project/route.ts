import { connectDB } from "@/lib/mongodb";
import Project from "@/models/Project";

export async function GET() {
  try {
    await connectDB();

    const projects = await Project.aggregate([
      { $sample: { size: 20 } }, // ambil 20 proyek secara acak
      {
        $lookup: {
          from: "users", // pastikan nama collection benar
          localField: "userId",
          foreignField: "_id",
          as: "userId",
        },
      },
      { $unwind: "$userId" },
      {
        $project: {
          title: 1,
          description: 1,
          images: 1,
          createdAt: 1,
          userId: {
            name: 1,
            username: 1,
            image: 1,
          },
        },
      },
    ]);

    return new Response(JSON.stringify({ projects }), { status: 200 });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
