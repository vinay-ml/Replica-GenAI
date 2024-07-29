import mongoose from "mongoose";

// Message schema with TTL index
const messageSchema = new mongoose.Schema({
  role: { type: String, required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now, index: { expires: "15d" } },
});

// User schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  chatHistory: { type: [messageSchema], default: [] },
});

export default mongoose.model("User", userSchema);
