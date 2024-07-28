import { OpenAI } from "openai";
import Vector from "../models/vectorSchema.js";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const ragService = async (query) => {
  const response = await openai.embeddings.create({
    model: "text-embedding-ada-002",
    input: query,
  });

  const queryEmbedding = response.data[0].embedding;

  const vectors = await Vector.find();
  let mostRelevant = null;
  let highestSimilarity = -Infinity;

  for (const vector of vectors) {
    for (const data of vector.data) {
      const similarity = cosineSimilarity(queryEmbedding, data.embedding);
      if (similarity > highestSimilarity) {
        highestSimilarity = similarity;
        mostRelevant = data.chunk;
      }
    }
  }

  return mostRelevant || "No relevant data found.";
};

const cosineSimilarity = (a, b) => {
  const dotProduct = a.reduce((sum, ai, i) => sum + ai * b[i], 0);
  const magnitudeA = Math.sqrt(a.reduce((sum, ai) => sum + ai * ai, 0));
  const magnitudeB = Math.sqrt(b.reduce((sum, bi) => sum + bi * bi, 0));
  return dotProduct / (magnitudeA * magnitudeB);
};

export default ragService;
