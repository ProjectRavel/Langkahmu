import mongoose, { Schema, Document, models } from "mongoose";

export interface IUser extends Document {
  name: string;
  username?: string;
  bio?: string;
  email: string;
  password?: string;
  image?: string;
  customImage?: string;
  emailVerified?: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String },
    username: { type: String, unique: true },
    bio: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    image: { type: String },
    customImage: { type: String, default: "" },
    emailVerified: { type: Date },
  },
  { timestamps: true }
);

export default models.User || mongoose.model<IUser>("User", UserSchema);
