import express from "express";
import loadDataAndVectorize from "../services/vectorizeAndStore.js";
import chatService from "../services/chatService.js";
import User from "../models/userSchema.js";

const router = express.Router();

router.post("/document", async (req, res) => {
  try {
    const { personalInfo } = req.body;
    await loadDataAndVectorize(personalInfo);
    res
      .status(200)
      .json({ message: "Document vectorized and stored successfully." });
  } catch (error) {
    console.error("Error in /document route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/query-embedding", async (req, res) => {
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

router.get("/history/:username", async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const chatHistory = user.chatHistory || [];
    res.json({ chatHistory });
  } catch (error) {
    console.error("Error retrieving chat history:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
