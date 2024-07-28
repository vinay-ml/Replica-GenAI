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

  // Get context from RAG service
  const context = await ragService(userMessage);
  console.log("Vector Context:", context);

  // Create the prompt using the context and user message
  const prompt = gptPrompt(context, userMessage);

  const messages = [
    {
      role: "system",
      content: `You are Vinay. Respond to the user naturally and conversationally, as if you were a human. Here is some context to assist you: ${context}`,
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

  // Append the AI response to history and save the user
  history.push({ role: "assistant", content: aiResponse.content });
  user.chatHistory = history;
  await user.save();

  console.log("AI Response:", aiResponse);
  return { response: aiResponse, history };
};

export default chatService;
