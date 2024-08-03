import React, { useState, useEffect } from "react";
import {
  ListItem,
  ListItemText,
  Box,
  Avatar,
  Paper,
  CircularProgress,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import myAvatar from "../assets/vinay.jpg";

const MessageList = ({ message }) => {
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("userName");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUserName(parsedUser.value);
      } catch (e) {
        console.error("Failed to parse userName from localStorage", e);
      }
    }
  }, []);

  const hasPhotos =
    message?.data &&
    message.data.photosLinks &&
    message.data.photosLinks.length > 0;

  const handleImageLoad = () => {
    setLoading(false);
  };

  const renderUserAvatar = () => {
    if (userName) {
      return (
        <Avatar sx={{ marginLeft: 1, fontSize: 16 }}>
          {userName.substring(0, 2).toUpperCase()}
        </Avatar>
      );
    } else {
      return (
        <Avatar sx={{ marginLeft: 1 }}>
          <PersonIcon />
        </Avatar>
      );
    }
  };

  return (
    <ListItem>
      <Box
        sx={{
          display: "flex",
          justifyContent: message.role === "user" ? "flex-end" : "flex-start",
          width: "100%",
          alignItems: "center",
        }}
      >
        {!hasPhotos && message.role !== "user" && (
          <Avatar alt="My Avatar" src={myAvatar} sx={{ marginRight: 1 }} />
        )}
        <Box
          sx={{
            display: "inline-block",
            maxWidth: "75%",
            minWidth: "100px",
            bgcolor: message.role === "user" ? "primary.main" : "grey.300",
            color:
              message.role === "user" ? "primary.contrastText" : "text.primary",
            borderRadius:
              message.role === "user" ? "16px 16px 0 16px" : "16px 16px 16px 0",
            ml: hasPhotos ? 4.5 : 0,
          }}
        >
          <ListItemText
            primary={message.content}
            sx={{
              padding: 1,
              paddingLeft: 2,
              paddingRight: 2,
            }}
          />
          {hasPhotos && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {loading && (
                <CircularProgress sx={{ alignSelf: "center", my: 2 }} />
              )}
              {message.data.photosLinks.map((link, index) => (
                <Paper elevation={10} key={index}>
                  <Box
                    component="img"
                    src={link}
                    alt={`photo-${index}`}
                    onLoad={handleImageLoad}
                    sx={{ width: "100%", mb: -1, borderRadius: "5px" }}
                  />
                </Paper>
              ))}
            </Box>
          )}
        </Box>
        {message.role === "user" && renderUserAvatar()}
      </Box>
    </ListItem>
  );
};

export default MessageList;
