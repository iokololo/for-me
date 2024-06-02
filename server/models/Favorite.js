import mongoose from "mongoose";

const schema = new mongoose.Schema({
  user: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
  items: {
    type: [mongoose.Schema.ObjectId],
    ref: "Product",
    required: false,
    timestamps: true,
  },
});

export default mongoose.model("Favorite", schema);
