import React from "react";
import { ListItem, ListItemText, Box, Avatar } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import myAvatar from "../assets/vinay.jpg";

const MessageList = ({ message }) => {
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
        {message.role !== "user" && (
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
