import mongoose from "mongoose";

const schema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: false },
  phone: { type: String, required: false },
  name: { type: String, required: false },
  verificationCode: { type: String, required: false },
  phoneVerificationCode: { type: String, required: false },
  isVerified: { type: Boolean, required: false },
  lastLogin: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
  resetPassword: { type: String, required: false },
  numberOfDocument: { type: String, required: false },
  iin: { type: String, required: false },
  address: { type: String, required: false },
  favorites: {
    type: mongoose.Schema.ObjectId,
    ref: "Favorite",
    required: false,
  },
  role: { type: String, required: false },
  skills: { type: [String], required: false },
  experience: { type: Number, required: false },
  hourlyRate: { type: Number, required: false },
  profilePicture: { type: String, required: false },
  description: { type: String, required: false },
  age: { type: Number, required: false },
});

export default mongoose.model("User", schema);
