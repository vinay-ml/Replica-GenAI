import React from "react";
import { Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import ChatHistory from "./components/ChatHistory";
import Home from "./components/Home";

const App = () => {
  return (
    <Box>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/history/:username" element={<ChatHistory />} />
      </Routes>
    </Box>
  );
};

export default App;
