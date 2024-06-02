import mongoose from "mongoose";

const schema = new mongoose.Schema({
  text: { type: String, required: true },
  stars: { type: Number, required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
}, 
{
    timestamps: true 
  });

export default mongoose.model("Review", schema);
