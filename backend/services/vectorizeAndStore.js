import { OpenAI } from "openai";
import connectDB from "../database/connectDB.js";
import Vector from "../models/vectorSchema.js";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const splitTextByDelimiter = (text, delimiter) => {
  return text
    .split(delimiter)
    .map((sentence) => sentence.trim())
    .filter((sentence) => sentence.length > 0);
};

const vectorizeAndStore = async (description) => {
  await connectDB();

  const chunks = splitTextByDelimiter(description, ".");

  console.log(chunks);

  const chunkData = await Promise.all(
    chunks.map(async (chunk) => {
      const embedding = await getEmbedding(chunk);
      return { chunk, embedding };
    })
  );

  const vectorData = new Vector({
    data: chunkData,
  });

  await vectorData.save();
  console.log(`Data saved with embeddings.`);
};

const getEmbedding = async (text) => {
  const response = await openai.embeddings.create({
    model: "text-embedding-ada-002",
    input: text,
  });
  return response.data[0].embedding;
};

const loadDataAndVectorize = async (personalInfo) => {
  await vectorizeAndStore(personalInfo);
};

export default loadDataAndVectorize;
