import { OpenAI } from "openai";
import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "../database/connectDB.js";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const ragService = async (query) => {
  await connectDB();

  const response = await openai.embeddings.create({
    model: "text-embedding-ada-002",
    input: query,
  });

  const queryEmbedding = response.data[0].embedding;

  const collection = mongoose.connection.collection("vectors");

  // MongoDB vector search
  const results = await collection
    .aggregate([
      {
        $search: {
          index: "default",
          knnBeta: {
            vector: queryEmbedding,
            path: "data.embedding",
            k: 5,
          },
        },
      },
      {
        $unwind: "$data",
      },
      {
        $project: {
          data: 1,
          score: { $meta: "searchScore" },
        },
      },
    ])
    .toArray();

  if (results.length === 0) {
    return "No relevant data found.";
  }

  // Get the document with the highest score
  const highestScoreDoc = results[0];

  return highestScoreDoc.data.chunk;
};

export default ragService;
