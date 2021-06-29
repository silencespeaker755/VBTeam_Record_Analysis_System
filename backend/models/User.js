import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, '"name" field is required'] },
  email: { type: String, required: [true, '"email" field is required'] },
  password: { type: String, required: [true, '"email" field is required'] },
  isAdmin: { type: Boolean, required: [true, '"isAdmin" field is required'] },
  birthday: { type: String },
  number: { type: String },
  position: { type: String },
  about: { type: String },
  auth: { type: Boolean },
});

export default mongoose.model("User", userSchema);
