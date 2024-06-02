import mongoose from "mongoose";
import User from "./User.js";
export const PRODUCT_TYPES = [
  "Books",
  "Courses"
];

const schema = new mongoose.Schema({
  title: { type: [String], required: true },
  images: { type: [String], required: true },
  onMainPage: { type: Boolean, default: false },
  type: {
    type: String,
    enum: PRODUCT_TYPES,
    required: true,
  },
  price: { type: Number, required: true },
  rating: { type: Number, required: false },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  lessons: {
    type: [{
      title: { type: String, required: false },
      video_url: { type: String, required: false },
      text: { type: String, required: false },
      order: { type: Number, required: false }
    }], required: false
  },
  description: { type: [String], required: true },
  book_url: { type: String, required: false },
});

schema.pre('save', async function (next) {
  if (this.isModified('author')) {
    const user = await User.findById(this.author);
    if (!user || user.role !== 'Teacher') {
      return next(new Error('Author must be a user with the role of Teacher'));
    }
  }
  next();
});

export default mongoose.model("Product", schema);
