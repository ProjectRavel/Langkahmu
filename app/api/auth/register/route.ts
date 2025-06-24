import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
    
export async function POST(req: Request) {
  try {
    await connectDB();
    const { username, email, password } = await req.json();

    console.log("Request:", { username, email });

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name: username,
      email,
      password: hashedPassword,
    });

    return NextResponse.json({ message: "User created", user: newUser });
  } catch (error) {
    console.error("Register Error:", error); // Tambahan penting
    return NextResponse.json(
      { message: "Server error", error },
      { status: 500 }
    );
  }
}
