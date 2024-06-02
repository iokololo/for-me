import mongoose from "mongoose";

export const ITEM_TYPE = ["Покупка", "Бронь", "file", "auction"];

const schema = new mongoose.Schema({
  user: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
  type: { type: String, enum: ITEM_TYPE, required: true },
  product: {
    type: mongoose.Schema.ObjectId,
    ref: "Product",
    required: false,
  },
  file: { type: String, required: false },
  amount: { type: Number, required: true },
  success: { type: Boolean, default: false },
  invoiceID: {
    type: Number,
    unique: true,
    required: true,
  },
  ip: { type: String, required: false },
  ipCountry: { type: String, required: false },
  ipCity: { type: String, required: false },
  phone: { type: String, required: false },
  email: { type: String, required: false },
  statusID: { type: String, required: false },
  issuer: { type: String, required: false },
  cardMask: { type: String, required: false },
  cardType: { type: String, required: false },
  transactionID: { type: String, required: false },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model("Payment", schema);
