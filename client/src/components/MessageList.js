import React from "react";
import { ListItem, ListItemText, Box, Avatar, Paper } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import myAvatar from "../assets/vinay.jpg";

const MessageList = ({ message }) => {
  const hasPhotos =
    message?.data &&
    message.data.photosLinks &&
    message.data.photosLinks.length > 0;

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
              {message.data.photosLinks.map((link, index) => (
                <Paper elevation={10} key={index}>
                  <Box
                    component="img"
                    src={link}
                    alt={`photo-${index}`}
                    sx={{ width: "100%", mb: -1, borderRadius: "5px" }}
                  />
                </Paper>
              ))}
            </Box>
          )}
        </Box>
        {message.role === "user" && (
          <Avatar sx={{ marginLeft: 1 }}>
            <PersonIcon />
          </Avatar>
        )}
      </Box>
    </ListItem>
  );
};

export default MessageList;
