import mongoose from "mongoose";

const schema = new mongoose.Schema({
  content: { type: String, required: false },
  role: { type: String, required: false },
  order: { type: Number, required: false },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

schema.pre('save', async function (next) {
    if (this.isNew) { 
      const lastMessage = await mongoose.model("Chat").findOne({ user: this.user }).sort({ order: -1 });
      this.order = lastMessage && lastMessage.order ? lastMessage.order + 1 : 1;
    }
    next();
});
  

export default mongoose.model("Chat", schema);
