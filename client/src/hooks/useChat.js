import { useState, useEffect } from "react";
import { getInitialMessage } from "../utils/getInitialMessage";

const useChat = (userName) => {
  const [history, setHistory] = useState([
    { role: "assistant", content: getInitialMessage(userName) },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const fetchHistory = async () => {
    try {
      const response = await fetch(`/api/history/${userName}`);
      if (!response.ok) {
        throw new Error("Failed to fetch chat history");
      }
      const data = await response.json();
      setHistory(data.chatHistory);
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [userName]);

  const sendMessage = async (message) => {
    const newHistory = [...history, { role: "user", content: message }];
    setHistory(newHistory);
    setIsTyping(true);

    await fetch("/api/query-embedding", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: message,
        username: userName,
        history: newHistory,
      }),
    });

    fetchHistory();
    setIsTyping(false);
  };

  return {
    history,
    isTyping,
    sendMessage,
  };
};

export default useChat;
