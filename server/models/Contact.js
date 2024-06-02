import mongoose from "mongoose";

const schema = new mongoose.Schema({
  user: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
  product: { type: mongoose.Schema.ObjectId, ref: "Product", required: true },
  isAnswer: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Contact", schema);
