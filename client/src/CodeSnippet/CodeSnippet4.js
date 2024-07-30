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
