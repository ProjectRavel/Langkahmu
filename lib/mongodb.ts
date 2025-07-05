import mongoose from "mongoose";

let isConnected = false;

export const connectDB = async (): Promise<void> => {
  if (isConnected) return;

  try {
    await mongoose.connect(process.env.MONGODB_URI!, {
      dbName: "langkahmu",
    });
    isConnected = true;
    console.log("MongoDB Connected!");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};
