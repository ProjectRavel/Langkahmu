import mongoose, { Schema, models, model } from "mongoose";

const LikeSchema = new Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }
}, {
  timestamps: true
});

// Cegah user like lebih dari 1x project yang sama
LikeSchema.index({ projectId: 1, userId: 1 }, { unique: true });

export default models.Like || model("Like", LikeSchema);
