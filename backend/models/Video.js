import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  url: { type: String, required: [true, '"url" field is required'] },
  title: { type: String, required: [true, '"title" field is required'] },
  description: { type: String },
  uploader: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, '"uploader" field is required'],
  },
  uploadTime: {
    type: String,
    required: [true, '"uploadTime" field is required'],
  },
});

export default mongoose.model("Video", videoSchema);
