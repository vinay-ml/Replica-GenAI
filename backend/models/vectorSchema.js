import mongoose from "mongoose";

const chunkSchema = new mongoose.Schema({
  chunk: { type: String, required: true },
  embedding: { type: [Number], required: true },
});

const vectorSchema = new mongoose.Schema({
  data: { type: [chunkSchema], required: true },
});

export default mongoose.model("Vector", vectorSchema);
