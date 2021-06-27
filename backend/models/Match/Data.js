import mongoose from "mongoose";
import User from "../User";

const dataSchema = new mongoose.Schema({
  player: { type: mongoose.Types.ObjectId, ref: User },

  passesOrSets: {
    type: mongoose.Types.ObjectId,
    required: [true, '"passingOrSetting" field is required'],
  },
  serveReceptions: {
    type: mongoose.Types.ObjectId,
    required: [true, '"serveReception" field is required'],
  },

  attacks: {
    type: mongoose.Types.ObjectId,
    required: [true, '"attacking" field is required'],
  },

  drops: {
    type: mongoose.Types.ObjectId,
    required: [true, '"drop" field is required'],
  },

  serves: {
    type: mongoose.Types.ObjectId,
    required: [true, '"serve" field is required'],
  },

  blocks: {
    type: mongoose.Types.ObjectId,
    required: [true, '"block" field is required'],
  },

  faults: {
    type: [Number],
    required: [true, '"faultTimes" field is required'],
  },

  notes: {
    type: String,
  },
});

export default mongoose.model("Data", dataSchema);
