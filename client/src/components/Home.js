import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import ChatContainer from "../components/ChatContainer";
import InfoModal from "../models/InfoModal";
import NameModal from "../models/NameModal";
import { setItemWithExpiry, getItemWithExpiry } from "../utils/storage";

const Home = () => {
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showNameModal, setShowNameModal] = useState(false);
  const [userName, setUserName] = useState(
    () => getItemWithExpiry("userName") || ""
  );

  useEffect(() => {
    setShowInfoModal(true);
  }, []);

  const handleStart = () => {
    setShowInfoModal(false);
    if (!userName) {
      setShowNameModal(true);
    }
  };

  const handleNameSubmit = (name) => {
    const expiryTime = 180 * 24 * 60 * 60 * 1000;
    setItemWithExpiry("userName", name, expiryTime);
    setItemWithExpiry("hasVisited", true, expiryTime);
    setUserName(name);
    setShowNameModal(false);
  };

  return (
    <Box>
      <ChatContainer key={userName} userName={userName} />
      <InfoModal
        open={showInfoModal}
        onClose={() => setShowInfoModal(false)}
        onStart={handleStart}
      />
      <NameModal open={showNameModal} onSubmit={handleNameSubmit} />
    </Box>
  );
};

export default Home;
