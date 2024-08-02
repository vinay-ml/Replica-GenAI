import React, {
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Box, List } from "@mui/material";
import MessageList from "./MessageList";
import "./ChatWindow.css";

const ChatWindow = forwardRef(({ history, isTyping }, ref) => {
  const messagesEndRef = useRef(null);

  useImperativeHandle(ref, () => ({
    scrollToBottom: () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    },
  }));

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, isTyping]);

  return (
    <Box
      sx={{ flex: 1, overflowY: "auto", paddingBottom: "56px" }}
      className="chat-window"
    >
      <List>
        {history.map((message, index) => (
          <MessageList key={index} message={message} />
        ))}
        {isTyping && (
          <MessageList message={{ role: "system", content: "Typing..." }} />
        )}
        <div ref={messagesEndRef} />
      </List>
    </Box>
  );
});

export default ChatWindow;
