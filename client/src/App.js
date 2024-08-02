import React from "react";
import { Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import ChatHistory from "./components/ChatHistory";
import Home from "./components/Home";
import LearnMore from "./components/LearnMore";

const App = () => {
  return (
    <Box>
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/history/:username" element={<ChatHistory />} />
        <Route path="/learn" element={<LearnMore />} />
      </Routes>
    </Box>
  );
};

export default App;
