import mongoose from "mongoose";

const articleSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, '"title" field is required'],
  },
  content: { type: String, required: [true, '"content" field is required'] },
  uploader: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, '"uploader" field is required'],
  },
  uploadTime: {
    type: String,
    required: [true, '"uploadTime" field is required'],
  },
});

export default mongoose.model("Article", articleSchema);
