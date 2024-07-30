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
