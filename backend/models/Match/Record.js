import mongoose from "mongoose";
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
});

export default mongoose.model("Record", recordSchema);
