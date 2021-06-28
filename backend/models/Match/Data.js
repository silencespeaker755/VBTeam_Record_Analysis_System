import mongoose from "mongoose";
import User from "../User";

const dataSchema = new mongoose.Schema({
  name: { type: String },
  player: { type: mongoose.Types.ObjectId, ref: User },
  passesOrSets: {
    type: mongoose.Schema.Types.Mixed,
    required: [true, '"passesOrSets" field is required'],
  },
  serveReceptions: {
    type: mongoose.Schema.Types.Mixed,
    required: [true, '"serveReceptions" field is required'],
  },
  attacks: {
    type: mongoose.Schema.Types.Mixed,
    required: [true, '"attacks" field is required'],
  },
  drops: {
    type: mongoose.Schema.Types.Mixed,
    required: [true, '"drops" field is required'],
  },
  serves: {
    type: mongoose.Schema.Types.Mixed,
    required: [true, '"serves" field is required'],
  },
  blocks: {
    type: mongoose.Schema.Types.Mixed,
    required: [true, '"blocks" field is required'],
  },
  faults: {
    type: mongoose.Schema.Types.Mixed,
    required: [true, '"faults" field is required'],
  },
  notes: { type: String },
});

export default mongoose.model("Data", dataSchema);
