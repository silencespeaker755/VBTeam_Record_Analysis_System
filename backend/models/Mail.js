import mongoose from "mongoose";

const mailSchema = new mongoose.Schema({
  receiver: { type: String, require: [true, '"receiver" field is required'] },
  expire: { type: Date, required: [true, '"expire" field is required'] },
  verification: {
    type: String,
    required: [true, '"verification" field is required'],
  },
});

export default mongoose.model("Mail", mailSchema);
