import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import ChatWindow from "./ChatWindow";
import MessageInput from "./MessageInput";

const ChatHistory = () => {
  const { username } = useParams();
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await fetch(`/api/history/${username}`);
        if (!response.ok) {
          throw new Error("Failed to fetch chat history");
        }
        const data = await response.json();
        setHistory(data.chatHistory);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchChatHistory();
  }, [username]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 500,
          height: `calc(100vh - 56px)`,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <ChatWindow history={history} isTyping={false} />
      </Box>
    </Box>
  );
};

export default ChatHistory;
