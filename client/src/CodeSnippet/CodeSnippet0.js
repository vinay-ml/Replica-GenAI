import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Box } from "@mui/material";

const CodeSnippet = () => {
  const codeString = `
import mongoose from "mongoose";

const chunkSchema = new mongoose.Schema({
  chunk: { type: String, required: true },
  embedding: { type: [Number], required: true },
});

const vectorSchema = new mongoose.Schema({
  data: { type: [chunkSchema], required: true },
});

export default mongoose.model("Vector", vectorSchema);

`;

  return (
    <Box
      sx={{
        borderRadius: 5,
      }}
    >
      <SyntaxHighlighter language="javascript" style={atomDark}>
        {codeString}
      </SyntaxHighlighter>
    </Box>
  );
};

export default CodeSnippet;
