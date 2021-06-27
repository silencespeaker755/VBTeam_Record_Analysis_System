import mongoose from "mongoose";
import User from "../User";

const dataSchema = new mongoose.Schema({
  name: { type: String, required: [true, '"name" field is required'] },
  player: { type: mongoose.Types.ObjectId, ref: User },
  passesOrSets: {
    type: Map,
    of: Number,
    required: [true, '"passesOrSets" field is required'],
  },
  serveReceptions: {
    type: Map,
    of: Number,
    required: [true, '"serveReceptions" field is required'],
  },
  attacks: {
    type: Map,
    of: Number,
    required: [true, '"attacks" field is required'],
  },
  drops: {
    type: Map,
    of: Number,
    required: [true, '"drops" field is required'],
  },
  serves: {
    type: Map,
    of: Number,
    required: [true, '"serves" field is required'],
  },
  blocks: {
    type: Map,
    of: Number,
    required: [true, '"blocks" field is required'],
  },
  faults: {
    type: Map,
    required: [true, '"faults" field is required'],
  },
  notes: { type: String },
});

export default mongoose.model("Data", dataSchema);
