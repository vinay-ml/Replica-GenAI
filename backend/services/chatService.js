import { OpenAI } from "openai";
import User from "../models/userSchema.js";
import ragService from "./ragService.js";
import dotenv from "dotenv";
import gptPrompt from "../prompts/gpt_prompt.js";
import { ratio } from "fuzzball";
import { photoLinks, photoRequestPhrases } from "../Constants/constants.js";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const isFuzzyMatch = (message, phrases) => {
  return phrases.some(
    (phrase) => ratio(message.toLowerCase(), phrase.toLowerCase()) > 80
  );
};

const chatService = async (userMessage, username, history) => {
  let user = await User.findOne({ username });
  if (!user) {
    user = new User({ username, chatHistory: [] });
  }

  let responseMessage = {
    role: "assistant",
    content: "",
    data: {
      photosLinks: [],
      generalLinks: [],
    },
  };

  if (isFuzzyMatch(userMessage, photoRequestPhrases)) {
    responseMessage.content =
      "Here are some of my photos from before the accident:";
    responseMessage.data.photosLinks = photoLinks;
  } else {
    const context = await ragService(userMessage);
    // console.log("Vector Context:", context);

    const prompt = gptPrompt(context, userMessage);

    const messages = [
      {
        role: "system",
        content: `You are Vinay. Respond to the user naturally and conversationally, as if you were a human. Here is some context to assist you: ${context}`,
      },
      ...history.map(({ role, content, data }) => ({ role, content, data })),
    ];

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: messages,
      max_tokens: 200,
      temperature: 0.4, // Lower temperature for more relevant responses
      presence_penalty: 0.2, // Moderate presence penalty to stay on topic
      top_p: 0.9, // Use nucleus sampling to ensure coherence
    });

    const aiResponse = response.choices[0].message;

    responseMessage.content = aiResponse.content;
  }

  history.push(responseMessage);
  user.chatHistory = history;
  await user.save();

  // console.log("AI Response:", responseMessage);
  return { response: responseMessage, history };
};

export default chatService;
