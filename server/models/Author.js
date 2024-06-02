import mongoose from "mongoose";

const schema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: false },
  skills: { type: [String], required: true },
  experience: { type: Number, required: true },
  hourlyRate: { type: Number, required: true },
  profilePicture: { type: String, required: false },
  email: { type: String, required: false },
  phoneNumber: { type: String, required: false },
  description: { type: String, required: false },
});

export default mongoose.model("Author", schema);
