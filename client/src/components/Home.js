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
  const [userID, setUserID] = useState(() => getItemWithExpiry("userID") || "");

  useEffect(() => {
    setShowInfoModal(true);
  }, []);

  const handleStart = () => {
    setShowInfoModal(false);
    if (!userName) {
      setShowNameModal(true);
    }
  };

  const generateUserID = (name) => {
    const randomNumber = Math.floor(10000 + Math.random() * 90000);
    return `${name}${randomNumber}`;
  };

  const handleNameSubmit = (name) => {
    const expiryTime = 90 * 24 * 60 * 60 * 1000;
    const newUserID = generateUserID(name);
    setItemWithExpiry("userName", name, expiryTime);
    setItemWithExpiry("userID", newUserID, expiryTime);
    setItemWithExpiry("hasVisited", true, expiryTime);
    setUserName(name);
    setUserID(newUserID);
    setShowNameModal(false);
  };

  return (
    <Box>
      <ChatContainer key={userName} userName={userName} userID={userID} />
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
