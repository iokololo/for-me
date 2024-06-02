import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    slots: { type: [String], required: true },
    teacher: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
    student: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
    lesson: { type: mongoose.Schema.ObjectId, ref: "Product", required: true },
  });
  
  export default mongoose.model("Schedule", scheduleSchema);
  