import React from "react";
import { Box, TextField, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import useMessageInput from "../hooks/useMessageInput";

const MessageInput = ({ onSend, isTyping }) => {
  const { message, setMessage, handleSend } = useMessageInput(isTyping, onSend);

  return (
    <Box sx={{ display: "flex", alignItems: "center", p: 2 }}>
      <TextField
        value={isTyping ? "Typing..." : message}
        onChange={(e) => setMessage(e.target.value)}
        variant="outlined"
        placeholder={isTyping ? "Typing..." : "Type a message"}
        fullWidth
        disabled={isTyping}
        sx={{ marginRight: 1 }}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            handleSend();
          }
        }}
      />
      <IconButton color="primary" onClick={handleSend} disabled={isTyping}>
        <SendIcon fontSize="large" />
      </IconButton>
    </Box>
  );
};

export default MessageInput;
