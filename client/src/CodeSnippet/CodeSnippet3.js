import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Box } from "@mui/material";

const CodeSnippet = () => {
  const codeString = `
import { OpenAI } from "openai";
import User from "../models/userSchema.js";
import ragService from "./ragService.js";
import dotenv from "dotenv";
import gptPrompt from "../prompts/gpt_prompt.js";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const chatService = async (userMessage, username, history) => {
  // Fetch or create user
  let user = await User.findOne({ username });
  if (!user) {
    user = new User({ username, chatHistory: [] });
  }

  // from RAG service
  const context = await ragService(userMessage);;

  // Create the prompt using the context and user message
  const prompt = gptPrompt(context, userMessage);

  const messages = [
    {
      role: "system",
      content: "You are Vinay. Respond to the user naturally and conversationally, as if you were a human. Here is some context to assist you: {context}",
    },
    ...history.map(({ role, content }) => ({ role, content })),
  ];

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: messages,
    max_tokens: 200,
    temperature: 0.7,
    presence_penalty: 0.6,
  });

  const aiResponse = response.choices[0].message;

  history.push({ role: "assistant", content: aiResponse.content });
  user.chatHistory = history;
  await user.save();

  return { response: aiResponse, history };
};

export default chatService;


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
