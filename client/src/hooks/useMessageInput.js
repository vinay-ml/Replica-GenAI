import { useState, useEffect } from "react";

const useMessageInput = (isTyping, onSend) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim() && !isTyping) {
      onSend(message.trim());
      setMessage("");
    }
  };

  useEffect(() => {
    if (isTyping) {
      setMessage("");
    }
  }, [isTyping]);

  return {
    message,
    setMessage,
    handleSend,
  };
};

export default useMessageInput;
