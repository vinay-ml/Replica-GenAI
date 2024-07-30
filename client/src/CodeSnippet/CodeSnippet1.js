import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Box } from "@mui/material";

const CodeSnippet = () => {
  const codeString = `
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

`;

  return (
    <Box
      sx={{
        width: {
          xs: "100%",
          sm: "100%",
          md: "75%",
          lg: "75%",
          xl: "85%",
        },
        overflowX: "auto",
        backgroundColor: "#2d2d2d",
        borderRadius: 1,
        p: 2,
      }}
    >
      <SyntaxHighlighter language="javascript" style={atomDark}>
        {codeString}
      </SyntaxHighlighter>
    </Box>
  );
};

export default CodeSnippet;
