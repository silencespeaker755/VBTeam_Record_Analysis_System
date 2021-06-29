import mongoose from "mongoose";
import User from "../User";

const articleSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, '"title" field is required'],
  },
  content: { type: String, required: [true, '"content" field is required'] },
  uploader: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, '"uploader" field is required'],
    ref: User,
  },
  uploadTime: {
    type: Date,
    required: [true, '"uploadTime" field is required'],
  },
});

export default mongoose.model("Article", articleSchema);
