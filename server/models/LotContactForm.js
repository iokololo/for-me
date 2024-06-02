import mongoose from "mongoose";

const schema = new mongoose.Schema({
  city: { type: String, required: false },
  name: { type: String, required: false },
  phone: { type: String, required: false },
  comment: { type: String, required: false },
});

export default mongoose.model("LotContactForm", schema);
