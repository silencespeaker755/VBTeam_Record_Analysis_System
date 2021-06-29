import mongoose from "mongoose";
import User from "../User";
import Set from "./Set";

const recordSchema = new mongoose.Schema({
  type: { type: String, required: [true, '"type" field is required'] },
  team: { type: String, required: [true, '"team" field is required'] },
  opponent: { type: String, required: [true, '"opponent" field is required'] },
  date: { type: String, required: [true, '"date" field is required'] },
  sets: {
    type: [mongoose.Types.ObjectId],
    required: [true, '"Sets" field is required'],
    ref: Set,
  },
  creator: {
    type: mongoose.Types.ObjectId,
    required: [true, '"creator" field is required'],
    ref: User,
  },
  createTime: {
    type: Date,
    required: [true, '"createTime" field is required'],
  },
});

export default mongoose.model("Record", recordSchema);
