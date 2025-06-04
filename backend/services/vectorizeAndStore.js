import { OpenAI } from "openai";
import connectDB from "../database/connectDB.js";
import Vector from "../models/vectorSchema.js";
import dotenv from "dotenv";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// change this to false if you want to embed full text as one
const USE_CHUNKING = true;

const getEmbedding = async (text) => {
  const response = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: text,
  });
  return response.data[0].embedding;
};

const vectorizeAndStore = async (description) => {
  await connectDB();
  await Vector.deleteMany({}); // optional: clear old data

  let docs = [];

  if (USE_CHUNKING) {
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 200,
      chunkOverlap: 50,
    });

    docs = await splitter.createDocuments([description]);
    console.log(`🔹 Chunking enabled: ${docs.length} chunks created`);
  } else {
    docs = [{ pageContent: description }];
    console.log("🔹 Chunking disabled: using full text as a single chunk");
  }

  const chunkData = [];

  for (let i = 0; i < docs.length; i++) {
    const doc = docs[i];
    try {
      console.log(`\n📄 Chunk ${i + 1}/${docs.length}:`);
      console.log(doc.pageContent); // log actual chunk content
      const embedding = await getEmbedding(doc.pageContent);
      chunkData.push({
        chunk: doc.pageContent,
        embedding,
      });
      console.log(`✅ Embedded`);
    } catch (err) {
      console.error(`❌ Failed embedding chunk ${i + 1}:`, err.message);
    }
  }

  const vectorData = new Vector({ data: chunkData });
  await vectorData.save();

  console.log(`✅ Vector store saved with ${chunkData.length} entries.`);
};

const loadDataAndVectorize = async (personalInfo) => {
  await vectorizeAndStore(personalInfo);
};

export default loadDataAndVectorize;
