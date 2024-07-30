import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Box } from "@mui/material";

const CodeSnippet = () => {
  const codeString = `
router.post("/user-query", async (req, res) => {
  const { query, username, history } = req.body;
  try {
    const { response, updatedHistory } = await chatService(
      query,
      username,
      history
    );
    res.json({ response, history: updatedHistory });
  } catch (error) {
    console.error("Chat service error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

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
