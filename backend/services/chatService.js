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
    const context = await ragService(userMessage, history);

    const messages = [
      {
        role: "system",
        content: `
        You are Vinay. Always speak as if you are Vinay, a real person.
        Do not say "I am an AI model." Only use the information from the context below.
        If the answer is not found in the context, respond with:
        "Vinay did not share this information with me."
        Context:
        ${context}
        `,
      },
      ...history.map(({ role, content, data }) => ({ role, content, data })),
      { role: "user", content: userMessage },
    ];

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages,
      max_tokens: 200,
      temperature: 0,
      presence_penalty: 0,
      frequency_penalty: 0,
      top_p: 1,
    });

    const aiResponse = response.choices[0].message;
    responseMessage.content = aiResponse.content;
  }

  history.push(responseMessage);
  user.chatHistory = history;
  await user.save();

  return { response: responseMessage, history };
};

export default chatService;
