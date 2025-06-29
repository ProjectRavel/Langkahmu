import mongoose, { Schema, models, model } from "mongoose"

const ProjectSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  images: {
    type: [String],
    default: [],
  },
  likesCount: {
    type: Number,
    default: 0,
  },
  commentsCount: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true
})

export default models.Project || model("Project", ProjectSchema)