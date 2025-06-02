import React, { useState } from "react";
import { ListItem, Box, Avatar, Paper, CircularProgress } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import myAvatar from "../assets/vinay.jpg";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"; // VSCode-like theme

const MessageList = ({ message }) => {
  const [loading, setLoading] = useState(true);

  const hasPhotos =
    message?.data &&
    message.data.photosLinks &&
    message.data.photosLinks.length > 0;

  const handleImageLoad = () => {
    setLoading(false);
  };

  const renderUserAvatar = () => (
    <Avatar sx={{ marginLeft: 1 }}>
      <PersonIcon />
    </Avatar>
  );

  return (
    <ListItem>
      <Box
        sx={{
          display: "flex",
          justifyContent: message.role === "user" ? "flex-end" : "flex-start",
          width: "100%",
          alignItems: "flex-start",
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
            p: 2,
            ml: hasPhotos ? 4.5 : 0,
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            fontFamily: "inherit",
          }}
        >
          <ReactMarkdown
            children={message.content}
            remarkPlugins={[remarkGfm]}
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");

                return inline ? (
                  <code
                    style={{
                      backgroundColor: "#000",
                      color: "#fff",
                      padding: "2px 6px",
                      borderRadius: "4px",
                      fontFamily: "monospace",
                      fontSize: "0.85rem",
                    }}
                  >
                    {children}
                  </code>
                ) : match ? (
                  <SyntaxHighlighter
                    style={vscDarkPlus}
                    language={match[1]}
                    PreTag="div"
                    customStyle={{
                      borderRadius: "8px",
                      padding: "12px",
                      fontSize: "0.9rem",
                      marginTop: "10px",
                      marginBottom: "10px",
                    }}
                    {...props}
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                ) : (
                  <pre
                    style={{
                      backgroundColor: "#000",
                      color: "#fff",
                      padding: "12px",
                      borderRadius: "8px",
                      overflowX: "auto",
                      fontFamily: "monospace",
                      fontSize: "0.9rem",
                      marginTop: "10px",
                      marginBottom: "10px",
                    }}
                  >
                    <code>{children}</code>
                  </pre>
                );
              },
              p({ children }) {
                return (
                  <p style={{ fontFamily: "inherit", margin: "0 0 10px" }}>
                    {children}
                  </p>
                );
              },
            }}
          />

          {hasPhotos && (
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 1 }}
            >
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
