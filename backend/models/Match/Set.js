import mongoose from "mongoose";
import Data from "./Data";

const setSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: [true, '"number" field is required'],
  },
  teamScore: {
    type: Number,
    required: [true, '"teamScore" field is required'],
  },
  opponentScore: {
    type: Number,
    required: [true, '"opponentScore" field is required'],
  },
  data: {
    type: [mongoose.Types.ObjectId],
    required: [true, '"sets" field is required'],
    ref: Data,
  },
});

export default mongoose.model("Set", setSchema);
