import mongoose from "mongoose";
import Data from "./Data";

const setSchema = new mongoose.Schema({
  teamScore: {
    type: String,
    required: [true, '"teamScore" field is required'],
  },
  opponentScore: {
    type: String,
    required: [true, '"opponentScore" field is required'],
  },
  set: {
    type: String,
    required: [true, '"opponentScore" field is required'],
  },
  data: {
    type: [mongoose.Types.ObjectId],
    required: [true, '"sets" field is required'],
    ref: Data,
  },
});

export default mongoose.model("Set", setSchema);
