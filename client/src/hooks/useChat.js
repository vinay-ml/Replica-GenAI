import { useState, useEffect } from "react";
import { getInitialMessage } from "../utils/getInitialMessage";

const useChat = (userName, userID) => {
  const [history, setHistory] = useState([
    { role: "assistant", content: getInitialMessage(userName) },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const fetchHistory = async () => {
    try {
      const response = await fetch(`/api/history/${userID}`);
      if (!response.ok) {
        throw new Error("Failed to fetch chat history");
      }
      const data = await response.json();
      const formattedHistory = data?.chatHistory?.map((item) => ({
        role: item.role,
        content: item.content,
      }));
      setHistory(formattedHistory);
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }
  };

  useEffect(() => {
    if (userName) {
      setHistory([{ role: "assistant", content: getInitialMessage(userName) }]);
      fetchHistory();
    }
  }, []);

  const sendMessage = async (message) => {
    const newHistory = [...history, { role: "user", content: message }];
    setHistory(newHistory);
    setIsTyping(true);

    try {
      const response = await fetch("/api/query-embedding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: message,
          username: userID,
          history: newHistory,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch assistant's response");
      }

      const data = await response.json();

      const assistantMessages = (
        Array.isArray(data.response) ? data.response : [data.response]
      ).map((item) => ({
        role: "assistant",
        content: item.content,
      }));

      setHistory((prevHistory) => [...prevHistory, ...assistantMessages]);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsTyping(false);
    }
  };

  return {
    history,
    isTyping,
    sendMessage,
  };
};

export default useChat;
