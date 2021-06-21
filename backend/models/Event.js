import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  start: { type: String, required: [true, '"start" field is required'] },
  end: { type: String },
  title: { type: String, required: [true, '"title" field is required'] },
  place: { type: String, required: [true, '"place" field is required'] },
  attendance: {
    type: [mongoose.Schema.Types.ObjectId],
    required: [true, '"attendance" field is required'],
  },
  notes: { type: String },
});

export default mongoose.model("Event", eventSchema);
