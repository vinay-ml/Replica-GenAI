import React, { useEffect, useRef } from "react";
import { Box, TextField, IconButton, Link } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import useMessageInput from "../hooks/useMessageInput";

const MessageInput = ({ onSend, isTyping }) => {
  const { message, setMessage, handleSend } = useMessageInput(isTyping, onSend);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (inputRef.current && !isTyping) {
      inputRef.current.focus();
    }
  }, [isTyping]);

  const handleLearnMoreClick = () => {
    navigate("/learn");
  };

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", p: 2 }}>
        <TextField
          inputRef={inputRef}
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
      <Link sx={{ ml: 8, cursor: "pointer" }} onClick={handleLearnMoreClick}>
        Want to learn how it is created ? Click Here
      </Link>
    </Box>
  );
};

export default MessageInput;
