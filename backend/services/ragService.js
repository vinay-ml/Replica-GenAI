import { OpenAI } from "openai";
import Vector from "../models/vectorSchema.js";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const ragService = async (query, history) => {
  const recentUserMessages = history
    .filter((msg) => msg.role === "user")
    .slice(-3)
    .map((msg) => msg.content)
    .join(" ");

  const fullQuery = `${recentUserMessages} ${query}`.trim();

  const response = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: fullQuery,
  });

  const queryEmbedding = response.data[0].embedding;

  const vectors = await Vector.find();
  const scoredChunks = [];

  for (const vector of vectors) {
    for (const data of vector.data) {
      const similarity = cosineSimilarity(queryEmbedding, data.embedding);
      scoredChunks.push({ chunk: data.chunk, similarity });
    }
  }

  scoredChunks.sort((a, b) => b.similarity - a.similarity);
  const topChunks = scoredChunks.slice(0, 3).map((item) => item.chunk);
  const context = topChunks.join("\n");

  return context || "Vinay did not share this information with me.";
};

const cosineSimilarity = (a, b) => {
  const dotProduct = a.reduce((sum, ai, i) => sum + ai * b[i], 0);
  const magnitudeA = Math.sqrt(a.reduce((sum, ai) => sum + ai * ai, 0));
  const magnitudeB = Math.sqrt(b.reduce((sum, bi) => sum + bi * bi, 0));
  return dotProduct / (magnitudeA * magnitudeB);
};

export default ragService;
