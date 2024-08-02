import React, { useEffect, useRef } from "react";
import { Box, useMediaQuery } from "@mui/material";
import ChatWindow from "./ChatWindow";
import MessageInput from "./MessageInput";
import useChat from "../hooks/useChat";

const ChatContainer = ({ userName, userID }) => {
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const { history, isTyping, sendMessage } = useChat(userName, userID);
  const messageInputRef = useRef(null);

  const handleSendMessage = (message) => {
    sendMessage(message);
    messageInputRef.current.scrollToBottom();
  };

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
          maxWidth: isSmallScreen ? "100%" : 500,
          height: `calc(100vh - ${isSmallScreen ? "56px" : "0px"})`,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <ChatWindow
          history={history}
          isTyping={isTyping}
          ref={messageInputRef}
        />
        <MessageInput onSend={handleSendMessage} isTyping={isTyping} />
      </Box>
    </Box>
  );
};

export default ChatContainer;
